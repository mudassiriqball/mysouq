import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'setting',
    children: [ 
      {
        path: '',
        loadChildren: './pages/setting/setting.module#SettingPageModule'
      },
      // {
      //   path: 'account-settings',
      //   loadChildren: './pages/account-settings/account-settings.module#AccountSettingsPageModule'
      // }
    ]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'register-as-shop',
    loadChildren: () => import('./pages/vender/register-as-shop/register-as-shop.module').then( m => m.RegisterAsShopPageModule)
  },
  {
    path: 'vender-dashbord',
    loadChildren: () => import('./pages/vender/vender-dashbord/vender-dashbord.module').then( m => m.VenderDashbordPageModule)
  },
  {
    path: 'vender-dashbord',
    loadChildren: './pages/vender/vender-dashbord/vender-dashbord.module#VenderDashbordPageModule'
  }
  // {
  //   path: 'vender-dashbord',
  //   loadChildren: () => import('./pages/vender/vender-dashbord/vender-dashbord.module').then( m => m.VenderDashbordPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule { }


// path: 'home',
//   children: [
//     {
//       path: '',
//       loadChildren:
//         './home/home.module#HomePageModule'
//     },
//     {
//       path: ':movies-list',
//       children: [
//         {
//           path: '',
//           loadChildren: './Components/movies-list/movies-list.module#MoviesListPageModule'
//         },
//         {
//           path: ':movies-detail',
//           loadChildren: './Components/movies-detail/movies-detail.module#MoviesDetailPageModule'
//         },
//       ]
//     },

//   ]