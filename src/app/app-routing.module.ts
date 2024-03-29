import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login-page/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./components/main-tab-bar/main-tab-bar.module").then(
        m => m.MainTabBarModule
      )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
