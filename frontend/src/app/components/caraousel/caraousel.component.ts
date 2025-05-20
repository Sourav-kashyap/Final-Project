import { Component } from '@angular/core';
import { Product } from 'src/app/interface/interface';

@Component({
  selector: 'app-caraousel',
  templateUrl: './caraousel.component.html',
  styleUrls: ['./caraousel.component.scss'],
})
export class CaraouselComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'Samsung Smart Phones Series',
      description: 'Make your impression with Samsung',
      price: 72000,
      discount: 20,
      stock: 150,
      images: [
        'https://images.samsung.com/is/image/samsung/assets/in/explore/brand/5-best-android-mobile-phones-2022-in-india/banner-mobile-720x761-080422.jpg?$720_N_JPG$',
      ],
      categoryId: 'electronics',
      brandId: 'samsung',
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      description: 'Immersive sound with noise cancellation.',
      price: 2999,
      discount: 15,
      stock: 200,
      images: [
        'https://blaupunktaudio.in/cdn/shop/files/Group_1_3.jpg?v=1730279162',
      ],
      categoryId: 'audio',
      brandId: 'blaupunkt',
    },
    {
      id: '3',
      name: '4K Ultra HD Smart TV',
      description: 'Cinematic experience with built-in streaming apps.',
      price: 59999,
      discount: 25,
      stock: 50,
      images: [
        'https://rukminim2.flixcart.com/fk-p-image/850/400/cf-chitrakaar-prod/b05e2c24db6921f16c56b221e2ddc338.jpeg?q=90',
      ],
      categoryId: 'electronics',
      brandId: 'lg',
    },
    {
      id: '4',
      name: 'Smartwatch Pro',
      description: 'Track your fitness goals with ease and style.',
      price: 4999,
      discount: 10,
      stock: 300,
      images: [
        'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/25739104/2023/11/2/397926e6-2d9a-4d36-bbf1-b6ab363d741c1698934826423Active20195DisplayBluetoothCallingSmartWatch600NITSBrightnes1.jpg',
      ],
      categoryId: 'wearables',
      brandId: 'apple',
    },
    {
      id: '5',
      name: 'Gaming Laptop',
      description: 'High performance for gaming and work.',
      price: 1299,
      discount: 15,
      stock: 70,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWlvZecWiUleGf5gmQGybdb5uJH39rl56mQ&s',
      ],
      categoryId: 'computers',
      brandId: 'dell',
    },
  ];

  currentIndex = 0;

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.products.length) % this.products.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
  }
}
