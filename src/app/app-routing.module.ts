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
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },

  {
    path: 'signin',
    loadChildren: './pages/signin/signin.module#SigninPageModule'
  },
  {
    path: 'setting',
    children: [ 
      {
        path: '',
        loadChildren: './pages/setting/setting.module#SettingPageModule'
      },
      {
        path: 'account-settings',
        loadChildren: './pages/account-settings/account-settings.module#AccountSettingsPageModule'
      }
    ]
  }
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