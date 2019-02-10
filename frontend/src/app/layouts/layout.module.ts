import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation/navigation.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [NavigationComponent],
  imports: [CommonModule],
  providers: []
})
export class LayoutModule {
}
