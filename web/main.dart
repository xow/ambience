import 'dart:html';

const noteStrings = [
  'c',
  'db',
  'd',
  'eb',
  'e',
  'f',
  'gb',
  'g',
  'ab',
  'a',
  'bb',
  'b',
];

void main() {
  noteStrings.forEach((note) {
    var key = DivElement();
    key.className = 'key';
    querySelector('.keyboard')?.children.add(key);
    key.onClick.listen((event) => {window.alert(note)});
  });
}
