import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'disqus',
  template: `
        <disqus-thread [page-identifier]="pageIdentifier" [page-url]="pageUrl"></disqus-thread>
  `
})
export class DisqusComponent implements OnInit {
  @Input() braceletId;
  @Input() braceletName;
  pageIdentifier;
  pageUrl;

  ngOnInit() {
    let braceletId = this.braceletId;
    this.pageIdentifier = "bracelet" + braceletId;
    this.pageUrl = "http://"+window.location.hostname+":"+window.location.port+"/"+window.location.pathname;
  }
}
