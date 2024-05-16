import GameList from "@/components/common/game/game";
import Header from "@/components/common/header/header";
import ImageSlider from "@/components/common/promotionslider/promotionslider";

export default function Home() {

  const images = [
    '/valorant-1.png',
    '/valorant-2.jpg',
    '/valorant-4.png',
  ]
 
  return (
   <div>
      <Header/>
      <div>
        <ImageSlider images={images}/>
      </div>
      <div>
        <GameList/>
      </div>
   </div>

  );
}
