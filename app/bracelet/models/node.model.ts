export interface Node {
  id: number;
  name: string;
  nodeColor: string;
  stringColor: string;

  className: string;

  stringBeforeLeft: string;
  stringAfterLeft: string;
  stringBeforeRight: string;
  stringAfterRight: string;

  parentLeft: Node;
  parentRight: Node;

  childLeft: Node;
  childRight: Node;

  //setUpRelations(nodeLeft:Node, nodeRight:Node);

  update(toUpdate:Node[]);

  //setParentLeft(node:Node);

  //setParentRight(node:Node);

  next();

  prev($event: any);

  isPhantom():boolean;

  setNewBehavior(behavior: InnerNode);

  getContrastString();
}

export interface InnerNode {
  innerUpdate(node: Node);
  innerConstructor(node: Node);
  next(node:  Node);
  prev(node:  Node);
}
