import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { RootComponent } from './components/root/root.component';
import { ArtboardComponent } from './components/artboard/artboard.component';
import { NguiInViewComponent } from './share-components/ngui-in-view/ngui-in-view.component';
@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    RootComponent,
    ArtboardComponent,
    NguiInViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
