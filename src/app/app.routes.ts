import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
{path:"home",component:HomeComponent},
{path:"products",component:ProductsComponent},
{path:"about",component:AboutComponent},
{path:"blog",component:BlogComponent},
{path:"contact",component:ContactComponent},
{path:"cart",component:CartComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"**",component:NotFoundComponent}


];
