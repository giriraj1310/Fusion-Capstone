import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainTabBarPageRoutingModule } from './main-tab-bar.router.module';

import { MainTabBarPage } from './main-tab-bar.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainTabBarPageRoutingModule
  ],
  declarations: [MainTabBarPage]
})
export class MainTabBarModule {}
