import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { BraceletModule }   from '../bracelet/bracelet.module';
import { NodeComponent }   from '../bracelet/directives/node.directive';
import { NewComponent }   from './new.component';
import { NewSimpleBraceletComponent }   from './simple.new.component';
import { NewZigzakBraceletComponent }   from './zigzak.new.component';
import { NewTextGeneratorBraceletComponent }   from './text-generator.new.component';
import { NewTextBraceletComponent }   from './text.new.component';
import { EditBraceletComponent }   from './edit.bracelet.component';
import { EditorBraceletComponent } from './directives/editor-bracelet.component';
import { ColorPickerComponent } from './directives/color-picker.component';
import { BraceletService } from '../bracelet/bracelet.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'bracelet/new',  component: NewComponent },
      { path: 'bracelet/new/simple',  component: NewSimpleBraceletComponent },
      { path: 'bracelet/new/zigzak',  component: NewZigzakBraceletComponent },
      { path: 'bracelet/new/generator',  component: NewTextGeneratorBraceletComponent },
      { path: 'bracelet/new/text',  component: NewTextBraceletComponent },
      { path: 'bracelet/edit/:id',  component: EditBraceletComponent },
    ]),
    HttpModule,
    FormsModule,
    BraceletModule
  ],
  declarations: [
    ColorPickerComponent,
    EditorBraceletComponent,
    //NodeComponent,
    NewComponent,
    NewSimpleBraceletComponent,
    NewZigzakBraceletComponent,
    NewTextGeneratorBraceletComponent,
    NewTextBraceletComponent,
    EditBraceletComponent
  ],
  providers: [
    BraceletService
  ],
  exports: [
    RouterModule
  ]
})
export class EditorModule { }
