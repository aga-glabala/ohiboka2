import {Component} from '@angular/core';
import {EditorBraceletComponent} from './directives/editor-bracelet.component';
import {BraceletService} from '../bracelet/bracelet.service';

@Component({
  host: {'(document:click)': 'toggleSymbols($event)'},
  template: `
  <div>
    wpisz tekst:
    <input [(ngModel)]="txt" (keyup)="textChanged(txt)" type="text">
    <button class="button-symbols">nowy znak</button>
  </div>
  <editor-bracelet [bracelet]="bracelet" [ngClass]="{'odd-first': bracelet.rows[0].odd}"></editor-bracelet>
  <div class="modal-container close-action" [ngClass]="{'hide': symbolsHidden}">
    <div class="modal symbols-modal close-action">
      <button class="close close-action">&times;</button>
      <h2>Wybierz symbol</h2>
      <div class="symbols-list">
        <button (click)="textChanged(txt + '!')">!</button>
        <button (click)="textChanged(txt + '#')">#</button>
        <button (click)="textChanged(txt + '^')">^</button>
        <button (click)="textChanged(txt + '*')">*</button>
        <button (click)="textChanged(txt + '(')">(</button>
        <button (click)="textChanged(txt + ')')">)</button>
        <button (click)="textChanged(txt + '\\\'')">'</button>
        <button (click)="textChanged(txt + ':')">:</button>
        <button (click)="textChanged(txt + '<')"><</button>
        <button (click)="textChanged(txt + '>')">></button>
        <button (click)="textChanged(txt + '?')">?</button>
        <button (click)="textChanged(txt + '/')">/</button>
        <button (click)="textChanged(txt + '\\\\')">\\</button>
        <button (click)="textChanged(txt + '|')">|</button>
        <button (click)="textChanged(txt + '+')">+</button>
        <button (click)="textChanged(txt + '-')">-</button>
        <button (click)="textChanged(txt + '=')">=</button>
        <button (click)="textChanged(txt + '_')">_</button>
        <button (click)="textChanged(txt + '∗')">∗</button>
        <button (click)="textChanged(txt + '⁙')">⁙</button>
        <button (click)="textChanged(txt + '‹')">‹</button>
        <button (click)="textChanged(txt + '›')">›</button>
        <button (click)="textChanged(txt + '↓')">↓</button>
        <button (click)="textChanged(txt + '←')">←</button>
        <button (click)="textChanged(txt + '↑')">↑</button>
        <button (click)="textChanged(txt + '→')">→</button>
        <button (click)="textChanged(txt + '◆')">◆</button>
        <button (click)="textChanged(txt + '◇')">◇</button>
        <button (click)="textChanged(txt + '▲')">▲</button>
        <button (click)="textChanged(txt + '△')">△</button>
        <button (click)="textChanged(txt + '♥')">♥</button>
      </div>
      <div><button class="close-button close-action">Zamknij</button></div>
    </div>
  </div>
  `
})
export class NewTextGeneratorBraceletComponent {
  constructor(public BraceletService:BraceletService) {
  }

  bracelet = {rows: []};
  dict = {};
  symbolsHidden = false;
  txt = '';

  textChanged(txt) {
    let bracelet = Object.assign({}, this.emptyBracelet);
    let newRows = [bracelet.rows[0]];
    for(let i = 0; i < txt.length; i++) {
      this.addLetter(this.translate(txt[i]), newRows);
      this.addLetter(this.translate("space"), newRows);
    }

    let lastRow = this.emptyBracelet.rows[1];
    lastRow.odd = !newRows[newRows.length - 1].odd;
    newRows.push(lastRow);

    bracelet.rows = newRows;
    this.bracelet = BraceletService.create(bracelet);
    this.txt = txt;
  }

  private addLetter(letter, rows) {
    for(let j = 0; j < letter.length; j++) {
      rows.push({
        odd: !rows[rows.length - 1].odd,
        knots: letter[j]
      })
    }
  }

  private translate(letter) {
   return this.dict[letter];
  }

  ngOnInit() {
    this.bracelet = BraceletService.create(this.emptyBracelet);
    this.BraceletService.getDict(8).subscribe(
                            dict => this.dict = dict);
  }
  private findAncestor (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
  }

  toggleSymbols(event) {
    if (event.target.className.indexOf('close-action') > -1) {
      this.symbolsHidden = true;
    } else if (event.target.className.indexOf('button-symbols') > -1) {
      this.symbolsHidden = false;
    } else if (this.findAncestor(event.target, 'modal')) {
      this.symbolsHidden = false;
    } else {
      this.symbolsHidden = true;
    }
  }

  emptyBracelet = {
    type: "text",
    strings: ['#000000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'],
    rows: [
      {
        odd: true,
        knots: [
        {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
      ]},{
        odd: false,
        knots: [
        {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
      ]}]
  }

}
