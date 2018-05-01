/**
@license Foswig.js | (c) Glenn Conner. | https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE
*/

// Ported to TypeScript
// Modified to accept custom random function

class Node {
	readonly neighbors: (Node | null)[] = [];
	constructor(readonly character: string) { }
}

class TrieNode {
	readonly children: Record<string, TrieNode> = {};
}

function addToDuplicatesTrie(word: string, duplicates: TrieNode) {
	if (word.length > 1) {
		addToDuplicatesTrie(word.substr(1), duplicates);
	}

	var currentNode = duplicates;
	for (var i = 0; i < word.length; ++i) {
		var childNode = currentNode.children[word[i]];
		if (!childNode) {
			childNode = new TrieNode();
			currentNode.children[word[i]] = childNode;
		}
		currentNode = childNode;
	}
}

function isDuplicate(word: string, duplicates: TrieNode) {
	word = word.toLowerCase();
	var currentNode = duplicates;
	for (var i = 0; i < word.length; ++i) {
		var childNode = currentNode.children[word[i]];
		if (!childNode) return false;
		currentNode = childNode;
	}
	return true;
}

export class Foswig {
	private readonly duplicates = new TrieNode();
	private readonly start = new Node('');
	private readonly map: Record<string, Node> = {};

	constructor(private readonly order: number) {

	}

	addWordsToChain(words: string[]) {
		for (var i = 0; i < words.length; ++i) {
			this.addWordToChain(words[i]);
		}
	}

	addWordToChain(word: string) {
		addToDuplicatesTrie(word.toLowerCase(), this.duplicates);

		var previous = this.start;
		var key = '';
		for (var i = 0; i < word.length; ++i) {
			var ch = word[i];
			key += ch;
			if (key.length > this.order) {
				key = key.substr(1);
			}
			var newNode = this.map[key];
			if (!newNode) {
				newNode = new Node(ch);
				this.map[key] = newNode;
			}

			previous.neighbors.push(newNode);
			previous = newNode;
		}
		//link to end node.
		previous.neighbors.push(null);
	}

	generateWord(minLength = 0, maxLength = -1, allowDuplicates = true, maxAttempts = 25, random = Math.random) {
		var word;
		var repeat;
		var attempts = 0;
		do {
			repeat = false;
			var nextNodeIndex = Math.floor(random() * this.start.neighbors.length);
			var currentNode = this.start.neighbors[nextNodeIndex];
			word = '';

			while (currentNode && (maxLength < 0 || word.length <= maxLength)) {
				word += currentNode.character;
				nextNodeIndex = Math.floor(random() * currentNode.neighbors.length);
				currentNode = currentNode.neighbors[nextNodeIndex];
			}
			if (word.length > maxLength || word.length < minLength) {
				repeat = true;
			}
		}
		// we don't want to output any exact replicas from the input dictionary
		while (repeat || (!allowDuplicates && ++attempts < maxAttempts && isDuplicate(word, this.duplicates)));
		if (attempts >= maxAttempts) {
			throw new Error('Unable to generate a word with the given parameters after ' + attempts + ' attempts');
		}
		return word;
	}
}