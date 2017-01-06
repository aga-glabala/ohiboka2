import {Component, Input, OnInit} from '@angular/core';
declare const DISQUS:any;
@Component({
  selector: 'disqus',
  template: ``
})
export class DisqusComponent implements OnInit {
  @Input() braceletId;
  @Input() braceletName;

  ngOnInit() {
    let braceletId = this.braceletId;
    let braceletName = this.braceletName;
    DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = "bracelet" + braceletId;
          this.page.url = "http://"+window.location.hostname+":"+window.location.port+"/"+window.location.pathname;
          this.page.title = braceletName;
        }
    });
  }
}
