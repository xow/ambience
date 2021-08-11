import 'dart:html';

void main() {
  for (var i = 0; i < 12; i++) {
    var key = new DivElement();
    key.className = "key";
    querySelector('.keyboard')?.children.add(key);
    key.onClick.listen((event) => {window.alert('hey you clicked')});
  }
}
