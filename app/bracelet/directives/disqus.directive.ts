import {Component, OnInit} from '@angular/core';
declare const DISQUS:any;
@Component({
  selector: 'disqus',
  template: `lalala`
})
export class DisqusComponent implements OnInit {


  ngOnInit() {
     DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = "bracelet" + this.bracelet.id;
                this.page.url = "http://"+window.location.hostname+":"+window.location.port+"/"+window.location.pathname;;
                this.page.title = "newTitle";
            }
        });
  }
}
