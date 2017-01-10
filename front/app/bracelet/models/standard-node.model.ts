import {Node, InnerNode} from './node.model';

export class StandardNode implements Node {
  id: number;
  name: string;
  nodeColor: string;
  stringColor: string;

  className: string;

  stringBeforeLeft: string;
  stringAfterLeft: string;
  stringBeforeRight: string;
  stringAfterRight: string;

  parentLeft: StandardNode;
  parentRight: StandardNode;

  childLeft: StandardNode;
  childRight: StandardNode;

  private nodeTypeBehavior: InnerNode;

  constructor(nodeTypeBehavior: InnerNode, nodeLeft:StandardNode, nodeRight:StandardNode) {
    this.nodeTypeBehavior = nodeTypeBehavior;
    this.setUpRelations(nodeLeft, nodeRight);

    this.parentLeft = nodeLeft;
    this.parentRight = nodeRight;
    this.id = Math.floor((Math.random() * 10000) + 1);

    this.nodeTypeBehavior.innerConstructor(this);
  }

  setUpRelations(nodeLeft:StandardNode = this.parentLeft, nodeRight:StandardNode = this.parentRight) {
    this.parentLeft = nodeLeft;
    this.parentRight = nodeRight;
    if(nodeLeft) {
      this.stringBeforeLeft = nodeLeft.stringAfterRight;
      nodeLeft.childRight = this;
    }
    if(nodeRight) {
      this.stringBeforeRight = nodeRight.stringAfterLeft;
      nodeRight.childLeft = this;
    }
  }

  update(toUpdate:Node[] = []) {
    this.nodeTypeBehavior.innerUpdate(this);

    if(this.childLeft) {
      toUpdate.push(this.childLeft);
    }
    if(this.childRight) {
      toUpdate.push(this.childRight);
    }

    var node = toUpdate.shift();
    if(node) {
      node.update(toUpdate);
    }
  }

  setParentLeft(node:StandardNode) {
    this.parentLeft = node;
    if(node) {
      node.childRight = this;
    }
  }

  setParentRight(node:StandardNode) {
    this.parentRight = node;
    if(node) {
      node.childLeft = this;
    }
  }

  next() {
    this.nodeTypeBehavior.next(this);
    this.update();
  }

  prev($event) {
    $event.preventDefault();
    this.nodeTypeBehavior.prev(this);
    this.update();
  }

  isPhantom():boolean {
    return this.name == 'phantom';
  }

  setNewBehavior(behavior: InnerNode) {
    this.nodeTypeBehavior = behavior;
    this.nodeTypeBehavior.innerConstructor(this);
  }

  getContrastString() {
    if(this.isPhantom()) {
      return;
    }

    var c = this.nodeColor.substring(1);
    var rgb = parseInt(c, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
      return '#ffffff';
    } else {
      return '#000000';
    }
  }
}

export class PhantomNode implements InnerNode {
  private static _instance:PhantomNode = new PhantomNode();

  constructor() {
      if(PhantomNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      PhantomNode._instance = this;
  }
  public static getInstance():PhantomNode {
      return PhantomNode._instance;
  }

  innerConstructor(node: Node) {
    node.name = 'phantom';
  }

  public static innerConstructorPhantom(node: Node, stringBeforeLeft:string, stringBeforeRight:string) {
    node.stringBeforeLeft = stringBeforeLeft;
    node.stringBeforeRight = stringBeforeRight;
    node.stringAfterLeft = stringBeforeLeft;
    node.stringAfterRight = stringBeforeRight;
  }

  innerUpdate(node: StandardNode) {
    node.setUpRelations(node.parentLeft, node.parentRight);

    node.stringAfterLeft = node.stringBeforeLeft;
    node.stringAfterRight = node.stringBeforeRight;
  }

  next(node: Node) {
  }

  prev(node: Node) {
  }
}

class LeftRegularNode implements InnerNode {
  private static _instance:LeftRegularNode = new LeftRegularNode();

  constructor() {
      if(LeftRegularNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      LeftRegularNode._instance = this;
  }
  public static getInstance():LeftRegularNode {
      return LeftRegularNode._instance;
  }

  innerConstructor(node: Node) {
    this.calcColors(node);
    node.name = 'left-regular';
  }

  innerUpdate(node: StandardNode) {
    node.setUpRelations();
    this.calcColors(node);
  }

  private calcColors(node: Node) {
    node.stringAfterLeft = node.stringBeforeRight;
    node.stringAfterRight = node.stringBeforeLeft;

    node.nodeColor = node.stringBeforeRight;
    node.stringColor = node.stringBeforeLeft;
  }

  next(node: Node) {
    node.setNewBehavior(LeftBackwardNode.getInstance());
  }

  prev(node: Node) {
    node.setNewBehavior(RightBackwardNode.getInstance());
  }
}

class RightRegularNode implements InnerNode {
  private static _instance:RightRegularNode = new RightRegularNode();

  constructor() {
      if(RightRegularNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      RightRegularNode._instance = this;
  }
  public static getInstance():RightRegularNode {
      return RightRegularNode._instance;
  }

  innerConstructor(node: Node) {
    this.calcColors(node);
    node.name = 'right-regular';
  }

  private calcColors(node: Node) {
    node.stringAfterLeft = node.stringBeforeRight;
    node.stringAfterRight = node.stringBeforeLeft;

    node.nodeColor = node.stringBeforeLeft;
    node.stringColor = node.stringBeforeRight;
  }

  innerUpdate(node: StandardNode) {
    node.setUpRelations();
    this.calcColors(node);
  }

  next(node: Node) {
    node.setNewBehavior(RightBackwardNode.getInstance());
  }

  prev(node: Node) {
    node.setNewBehavior(LeftBackwardNode.getInstance());
  }
}

class LeftBackwardNode implements InnerNode {
  private static _instance:LeftBackwardNode = new LeftBackwardNode();

  constructor() {
      if(LeftBackwardNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      LeftBackwardNode._instance = this;
  }
  public static getInstance():LeftBackwardNode {
      return LeftBackwardNode._instance;
  }

  innerConstructor(node: Node) {
    this.calcColors(node);
    node.name = 'left-backward';
  }

  private calcColors(node: Node) {
    node.stringAfterLeft = node.stringBeforeLeft;
    node.stringAfterRight = node.stringBeforeRight;

    node.nodeColor = node.stringBeforeRight;
    node.stringColor = node.stringBeforeLeft;
  }

  innerUpdate(node: StandardNode) {
    node.setUpRelations();
    this.calcColors(node);
  }

  next(node: Node) {
    node.setNewBehavior(RightRegularNode.getInstance());
  }

  prev(node: Node) {
    node.setNewBehavior(LeftRegularNode.getInstance());
  }
}

class RightBackwardNode implements InnerNode {
  private static _instance:RightBackwardNode = new RightBackwardNode();

  constructor() {
      if(RightBackwardNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      RightBackwardNode._instance = this;
  }
  public static getInstance():RightBackwardNode {
      return RightBackwardNode._instance;
  }

  innerConstructor(node: Node) {
    this.calcColors(node);
    node.name = 'right-backward';
  }

  private calcColors(node: Node) {
    node.stringAfterLeft = node.stringBeforeLeft;
    node.stringAfterRight = node.stringBeforeRight;

    node.nodeColor = node.stringBeforeLeft;
    node.stringColor = node.stringBeforeRight;
  }

  innerUpdate(node: StandardNode) {
    node.setUpRelations();
    this.calcColors(node);
  }

  next(node: Node) {
    node.setNewBehavior(LeftRegularNode.getInstance());
  }

  prev(node: Node) {
    node.setNewBehavior(RightRegularNode.getInstance());
  }
}

export function createNode(type:string, nodeLeft:StandardNode, nodeRight:StandardNode) : StandardNode {
  switch(type) {
  case 'left-regular':
    return new StandardNode(LeftRegularNode.getInstance(), nodeLeft, nodeRight);
  case 'right-regular':
    return new StandardNode(RightRegularNode.getInstance(), nodeLeft, nodeRight);
  case 'left-backward':
    return new StandardNode(LeftBackwardNode.getInstance(), nodeLeft, nodeRight);
  case 'right-backward':
    return new StandardNode(RightBackwardNode.getInstance(), nodeLeft, nodeRight);
  case 'phantom':
    return new StandardNode(PhantomNode.getInstance(), nodeLeft, nodeRight);
  default:
    return new StandardNode(LeftRegularNode.getInstance(), nodeLeft, nodeRight);
  }
}
