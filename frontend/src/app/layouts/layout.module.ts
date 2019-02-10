import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation/navigation.component";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [NavigationComponent],
  imports: [],
  providers: []
})
export class LayoutModule {
}
