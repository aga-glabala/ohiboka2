import {Component, Input} from '@angular/core';

@Component({
  selector: 'node',
  template: `<div class="node-type-{{node.name}}" (click)="!readonly && node.next()" (contextmenu)="!readonly && node.prev($event)" id="node-{{node.id}}">
    <div class="left-up-string" [style.backgroundColor]="node.stringBeforeLeft"></div>
    <div class="left-bottom-string" [style.backgroundColor]="node.stringAfterLeft"></div>
    <div class="node {{node.className}}" [style.backgroundColor]="node.nodeColor">
      <div class="up-string" [style.borderLeftColor]="node.getContrastString()"></div>
      <div class="bottom-string" [style.borderLeftColor]="node.getContrastString()"></div>
    </div>
    <div class="right-up-string" [style.backgroundColor]="node.stringBeforeRight"></div>
    <div class="right-bottom-string" [style.backgroundColor]="node.stringAfterRight"></div>
  </div>`
})
export class NodeComponent {
  @Input() node;
  @Input() readonly;

}
