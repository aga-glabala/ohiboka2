import {Node} from './node.model';

export class TextNode implements Node {
  id: number;
  name: string;
  nodeColor: string;
  stringColor: string;

  className: string;

  stringBeforeLeft: string;
  stringAfterLeft: string;
  stringBeforeRight: string;
  stringAfterRight: string;

  leadString: string; //tlo
  baseString: string; //napis

  parentLeft: Node;
  parentRight: Node;

  childLeft: Node;
  childRight: Node;

  private nodeTypeBehavior: InnerTextNode;

  constructor(nodeTypeBehavior: InnerTextNode, leadString:string, baseString:string) {
    this.nodeTypeBehavior = nodeTypeBehavior;

    this.stringBeforeLeft = leadString;
    this.stringAfterLeft = baseString;
    this.stringBeforeRight = baseString;
    this.stringAfterRight = leadString;

    this.leadString = leadString;
    this.baseString = baseString;

    this.id = Math.floor((Math.random() * 10000) + 1);

    this.nodeTypeBehavior.innerConstructor(this);
  }

  update(toUpdate:Node[] = []) {
    this.nodeTypeBehavior.innerUpdate(this);

    this.stringBeforeLeft = this.leadString;
    this.stringAfterLeft = this.baseString;
    this.stringBeforeRight = this.baseString;
    this.stringAfterRight = this.leadString;
  }

  next() {
    this.nodeTypeBehavior.next(this);
    this.update();
  }

  prev($event: any) {
    $event.preventDefault();
    this.nodeTypeBehavior.prev(this);
    this.update();
  }

  isPhantom():boolean {
    return this.name == 'phantom';
  }

  setNewBehavior(behavior: InnerTextNode) {
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

interface InnerTextNode {
  innerUpdate(node: TextNode);
  innerConstructor(node: TextNode);
  next(node:  TextNode);
  prev(node: TextNode);
}

export class PhantomTextNode implements InnerTextNode {
  private static _instance:PhantomTextNode = new PhantomTextNode();

  constructor() {
      if(PhantomTextNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      PhantomTextNode._instance = this;
  }
  public static getInstance():PhantomTextNode {
      return PhantomTextNode._instance;
  }

  innerConstructor(node: TextNode) {
    node.name = 'phantom';
  }

  public static innerConstructorPhantom(node: Node, stringBeforeLeft:string, stringBeforeRight:string) {
    node.stringBeforeLeft = stringBeforeLeft;
    node.stringBeforeRight = stringBeforeRight;
    node.stringAfterLeft = stringBeforeLeft;
    node.stringAfterRight = stringBeforeRight;
  }

  innerUpdate(node: TextNode) {}

  next(node: TextNode) {}
  prev(node: TextNode) {}
}


class VerticalNode implements InnerTextNode {
  private static _instance:VerticalNode = new VerticalNode();

  constructor() {
      if(VerticalNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      VerticalNode._instance = this;
  }
  public static getInstance():VerticalNode {
      return VerticalNode._instance;
  }

  innerConstructor(node: TextNode) {
    this.calcColors(node);
    node.name = 'vertical';
  }

  private calcColors(node: TextNode) {
    node.nodeColor = node.baseString;
    node.stringColor = node.leadString;
  }

  innerUpdate(node: TextNode) {
    this.calcColors(node);
  }

  next(node: TextNode) {
    node.setNewBehavior(HorizontalNode.getInstance());
  }

  prev(node: TextNode) {
    node.setNewBehavior(HorizontalNode.getInstance());
  }
}

class HorizontalNode implements InnerTextNode {
  private static _instance:HorizontalNode = new HorizontalNode();

  constructor() {
      if(HorizontalNode._instance){
          throw new Error("Error: Instantiation failed: Use *.getInstance() instead of new.");
      }
      HorizontalNode._instance = this;
  }
  public static getInstance():HorizontalNode {
      return HorizontalNode._instance;
  }

  innerConstructor(node: TextNode) {
    this.calcColors(node);
    node.name = 'horizontal';
  }

  private calcColors(node: TextNode) {
    node.nodeColor = node.leadString;
    node.stringColor = node.baseString;
  }

  innerUpdate(node: TextNode) {
    this.calcColors(node);
  }

  next(node: TextNode) {
    node.setNewBehavior(VerticalNode.getInstance());
  }

  prev(node: TextNode) {
    node.setNewBehavior(VerticalNode.getInstance());
  }
}

export function createTextNode(type: string, leadString:string, baseString:string) : TextNode {
  switch(type) {
  case 'horizontal':
    return new TextNode(HorizontalNode.getInstance(), leadString, baseString);
  case 'vertical':
    return new TextNode(VerticalNode.getInstance(), leadString, baseString);
  case 'phantom':
    return new TextNode(PhantomTextNode.getInstance(), leadString, baseString);
  default:
    return new TextNode(HorizontalNode.getInstance(), leadString, baseString);
  }
}
