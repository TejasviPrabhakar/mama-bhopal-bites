
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = 'https://supabase.lovable.dev'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbW1ka2V2eXNmeG9qc3VjYWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTY3OTYsImV4cCI6MjAyOTczMjc5Nn0.zOVJZs0nCK1pmhBFLZh8kvAVPdqDxZ3HbrYzo9O5zWc'
const supabase = createClient(supabaseUrl, supabaseKey)

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [activeCategory, setActiveCategory] = useState("north-indian");
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save reservation to Supabase
      const { error } = await supabase
        .from('reservations')
        .insert([
          { 
            name, 
            email, 
            phone, 
            reservation_date: date, 
            reservation_time: time, 
            guests: parseInt(guests) 
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Reservation Request Received",
        description: `Thank you ${name}! We'll confirm your table for ${guests} guests on ${date} at ${time} shortly.`,
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("2");
    } catch (error) {
      console.error("Error saving reservation:", error);
      toast({
        title: "Reservation Failed",
        description: "We couldn't process your reservation. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save subscription to Supabase
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email: subscribeEmail }]);
        
      if (error) throw error;
      
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our exciting offers!",
      });
      
      // Reset form
      setSubscribeEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Subscription Failed",
        description: "We couldn't process your subscription. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const reviews = [
    { name: "Rajesh K.", review: "Mama's restaurant felt like dining at my grandmother's home. The Dal Makhani was rich and creamy, just as it should be!", rating: 5 },
    { name: "Priya M.", review: "Fantastic South Indian dishes - their Masala Dosa is the best I've had outside of Chennai. Great family atmosphere too!", rating: 5 },
    { name: "Amit S.", review: "The Indo-Chinese fusion dishes are a must-try. Perfect blend of flavors and very authentic taste.", rating: 4 },
    { name: "Sneha G.", review: "Wonderful place for family gatherings. We celebrated my parents' anniversary here and the staff was very accommodating.", rating: 5 },
    { name: "Kiran J.", review: "The desserts are absolutely divine! Try their Gulab Jamun with ice cream - simply heavenly!", rating: 5 },
    { name: "Rahul P.", review: "Best masala chai in town. Perfect with their samosas as an evening snack.", rating: 4 },
    { name: "Meera S.", review: "The authentic flavors took me right back to my childhood. Will definitely be returning!", rating: 5 },
    { name: "Vikram D.", review: "I love that they cater to all dietary preferences. As a vegetarian, I had so many options to choose from.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#f9f5f0] font-comic">
      {/* Header & Navigation */}
      <header className="bg-gradient-to-r from-[#5c2018] to-[#7a2b20] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold">Mama</h1>
              <p className="text-sm md:text-base">The Family Restaurant</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#about" className="text-lg hover:text-[#f3bf7a] transition-colors">About</a>
              <a href="#menu" className="text-lg hover:text-[#f3bf7a] transition-colors">Menu</a>
              <a href="#reserve" className="text-lg hover:text-[#f3bf7a] transition-colors">Reservations</a>
              <a href="#contact" className="text-lg hover:text-[#f3bf7a] transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1452967712862-0cca1839ff27?auto=format&fit=crop&q=80')] bg-cover bg-center h-[60vh]">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience Authentic Indian Cuisine</h2>
            <p className="text-xl md:text-2xl mb-8">A culinary journey through regional flavors of India</p>
            <div className="space-x-4">
              <Button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-[#f3bf7a] text-[#5c2018] hover:bg-[#e0a85c] text-lg py-7 px-9"
              >
                View Menu
              </Button>
              <Button 
                onClick={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="bg-[#f3bf7a] text-[#5c2018] hover:bg-[#e0a85c] text-lg py-7 px-9"
              >
                Book a Table
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5c2018]">About Us</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col justify-between h-full">
              <p className="mb-4 text-gray-700 text-justify">
                Mama – The Family Restaurant is a warm, family-owned eatery nestled in the heart of Bhopal, Madhya Pradesh. 
                Since its inception in 2018, its goal has been simple: to bring together the rich tapestry of Indian 
                regional flavors under one cozy roof.
              </p>
              <p className="mb-4 text-gray-700 text-justify">
                From the creamy gravies of North India to the tangy delights of the South and the fiery zest 
                of Indo-Chinese creations, every dish at Mama reflects passion for authentic, home-style cooking.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-[#5c2018]">Ambience & Experience</h3>
              <p className="mb-4 text-gray-700 text-justify">
                Stepping into Mama, you're greeted by inviting décor that blends modern comfort with familial charm. 
                Soft, ambient lighting, comfortable wooden seating, and hand-painted murals celebrating India's 
                culinary heritage create a welcoming atmosphere—ideal for both intimate family dinners and 
                vibrant group gatherings.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80" 
                alt="Restaurant interior" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-2 text-[#5c2018]">Community & Vision</h3>
            <p className="text-gray-700 text-justify">
              Beyond day-to-day service, Mama hosts monthly themed food festivals, weekend brunches, 
              and interactive cooking demonstrations, fostering a sense of community among our patrons. 
              Its vision is to become Bhopal's premier destination for regional Indian cuisine while 
              nurturing connections over shared meals. At Mama – The Family Restaurant, food is more 
              than nourishment; it's a journey of togetherness, and every visit feels like coming home.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-[#f9f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5c2018]">Our Menu</h2>
          
          {/* Menu categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className={`border-[#5c2018] text-[#5c2018] hover:bg-[#5c2018] hover:text-white ${activeCategory === 'north-indian' ? 'bg-[#5c2018] text-white' : ''}`}
              onClick={() => setActiveCategory('north-indian')}
            >
              North Indian
            </Button>
            <Button 
              variant="outline" 
              className={`border-[#5c2018] text-[#5c2018] hover:bg-[#5c2018] hover:text-white ${activeCategory === 'south-indian' ? 'bg-[#5c2018] text-white' : ''}`}
              onClick={() => setActiveCategory('south-indian')}
            >
              South Indian
            </Button>
            <Button 
              variant="outline" 
              className={`border-[#5c2018] text-[#5c2018] hover:bg-[#5c2018] hover:text-white ${activeCategory === 'indo-chinese' ? 'bg-[#5c2018] text-white' : ''}`}
              onClick={() => setActiveCategory('indo-chinese')}
            >
              Indo-Chinese
            </Button>
            <Button 
              variant="outline" 
              className={`border-[#5c2018] text-[#5c2018] hover:bg-[#5c2018] hover:text-white ${activeCategory === 'desserts' ? 'bg-[#5c2018] text-white' : ''}`}
              onClick={() => setActiveCategory('desserts')}
            >
              Desserts
            </Button>
            <Button 
              variant="outline" 
              className={`border-[#5c2018] text-[#5c2018] hover:bg-[#5c2018] hover:text-white ${activeCategory === 'beverages' ? 'bg-[#5c2018] text-white' : ''}`}
              onClick={() => setActiveCategory('beverages')}
            >
              Beverages
            </Button>
          </div>
          
          {/* Featured dishes based on category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeCategory === 'north-indian' && [
              { name: "Butter Chicken", price: "₹350", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80", description: "Tender chicken in a rich, creamy tomato sauce" },
              { name: "Paneer Tikka", price: "₹280", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80", description: "Marinated cottage cheese grilled to perfection" },
              { name: "Dal Makhani", price: "₹220", image: "https://images.unsplash.com/photo-1626132527578-6a2b85cb1ceb?auto=format&fit=crop&q=80", description: "Slow-cooked black lentils with cream and spices" },
              { name: "Chicken Biryani", price: "₹320", image: "https://images.unsplash.com/photo-1589249941113-7d40d86ec868?auto=format&fit=crop&q=80", description: "Aromatic rice dish with tender chicken pieces" }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-[#5c2018]">{dish.name}</h3>
                    <span className="font-semibold text-[#5c2018]">{dish.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {activeCategory === 'south-indian' && [
              { name: "Masala Dosa", price: "₹180", image: "https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&q=80", description: "Crispy rice pancake filled with spiced potatoes" },
              { name: "Idli Sambhar", price: "₹140", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80", description: "Steamed rice cakes served with lentil soup and chutney" },
              { name: "Rava Uttapam", price: "₹170", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?auto=format&fit=crop&q=80", description: "Semolina pancakes topped with vegetables" },
              { name: "Chettinad Chicken", price: "₹340", image: "https://images.unsplash.com/photo-1604502076110-48c760b19069?auto=format&fit=crop&q=80", description: "Spicy chicken curry with aromatic spices from Chettinad region" }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-[#5c2018]">{dish.name}</h3>
                    <span className="font-semibold text-[#5c2018]">{dish.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {activeCategory === 'indo-chinese' && [
              { name: "Vegetable Manchurian", price: "₹220", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80", description: "Vegetable balls in a sweet and spicy sauce" },
              { name: "Chilli Paneer", price: "₹270", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80", description: "Cottage cheese tossed with bell peppers in spicy sauce" },
              { name: "Hakka Noodles", price: "₹200", image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&q=80", description: "Stir-fried noodles with vegetables in Indo-Chinese style" },
              { name: "Szechuan Chicken", price: "₹290", image: "https://images.unsplash.com/photo-1603476870481-82bed3872a29?auto=format&fit=crop&q=80", description: "Spicy chicken dish with Szechuan peppers and vegetables" }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-[#5c2018]">{dish.name}</h3>
                    <span className="font-semibold text-[#5c2018]">{dish.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {activeCategory === 'desserts' && [
              { name: "Gulab Jamun", price: "₹120", image: "https://images.unsplash.com/photo-1593200867631-5ad05295836c?auto=format&fit=crop&q=80", description: "Deep-fried milk solids soaked in sugar syrup" },
              { name: "Rasmalai", price: "₹150", image: "https://images.unsplash.com/photo-1602496241036-0a174537618e?auto=format&fit=crop&q=80", description: "Soft cottage cheese dumplings in sweetened milk" },
              { name: "Gajar Halwa", price: "₹140", image: "https://images.unsplash.com/photo-1549222945-a69e6d910b9f?auto=format&fit=crop&q=80", description: "Carrot pudding with nuts and cardamom" },
              { name: "Kulfi", price: "₹110", image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?auto=format&fit=crop&q=80", description: "Traditional Indian ice cream with pistachios and saffron" }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-[#5c2018]">{dish.name}</h3>
                    <span className="font-semibold text-[#5c2018]">{dish.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {activeCategory === 'beverages' && [
              { name: "Masala Chai", price: "₹60", image: "https://images.unsplash.com/photo-1561336526-2914f13ceb36?auto=format&fit=crop&q=80", description: "Indian spiced tea with milk" },
              { name: "Mango Lassi", price: "₹90", image: "https://images.unsplash.com/photo-1527583426959-c481c04ebf0d?auto=format&fit=crop&q=80", description: "Yogurt-based mango smoothie" },
              { name: "Badam Milk", price: "₹100", image: "https://images.unsplash.com/photo-1573812195421-50a396d17893?auto=format&fit=crop&q=80", description: "Almond-flavored milk with saffron and cardamom" },
              { name: "Fresh Lime Soda", price: "₹70", image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&q=80", description: "Refreshing lime soda, sweet or salted" }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-[#5c2018]">{dish.name}</h3>
                    <span className="font-semibold text-[#5c2018]">{dish.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#5c2018] hover:bg-[#421410]">View Full Menu</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-[#5c2018]">Complete Menu</DialogTitle>
                </DialogHeader>
                <div className="space-y-8 p-4">
                  {/* North Indian Section */}
                  <div>
                    <h3 className="text-xl font-bold text-[#5c2018] mb-4">North Indian Delicacies</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "Butter Chicken", price: "₹350" },
                        { name: "Paneer Tikka", price: "₹280" },
                        { name: "Dal Makhani", price: "₹220" },
                        { name: "Rogan Josh", price: "₹370" },
                        { name: "Malai Kofta", price: "₹260" },
                        { name: "Naan/Roti", price: "₹40" },
                        { name: "Biryani", price: "₹320" },
                        { name: "Palak Paneer", price: "₹260" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b pb-2">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* South Indian Section */}
                  <div>
                    <h3 className="text-xl font-bold text-[#5c2018] mb-4">South Indian Specialties</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "Masala Dosa", price: "₹180" },
                        { name: "Idli Sambhar", price: "₹140" },
                        { name: "Rava Uttapam", price: "₹170" },
                        { name: "Medu Vada", price: "₹130" },
                        { name: "Mysore Bonda", price: "₹160" },
                        { name: "Chettinad Chicken", price: "₹340" },
                        { name: "Paper Plain Dosa", price: "₹150" },
                        { name: "Pongal", price: "₹180" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b pb-2">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Indo-Chinese Section */}
                  <div>
                    <h3 className="text-xl font-bold text-[#5c2018] mb-4">Indo-Chinese Fusion</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "Vegetable Manchurian", price: "₹220" },
                        { name: "Hakka Noodles", price: "₹200" },
                        { name: "Chilli Paneer", price: "₹270" },
                        { name: "Fried Rice", price: "₹210" },
                        { name: "Spring Rolls", price: "₹180" },
                        { name: "Chilli Garlic Prawns", price: "₹380" },
                        { name: "Crispy Chilli Potatoes", price: "₹190" },
                        { name: "Szechuan Chicken", price: "₹290" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b pb-2">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Desserts Section */}
                  <div>
                    <h3 className="text-xl font-bold text-[#5c2018] mb-4">Desserts</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "Gulab Jamun", price: "₹120" },
                        { name: "Rasmalai", price: "₹150" },
                        { name: "Gajar Halwa", price: "₹140" },
                        { name: "Kulfi", price: "₹110" },
                        { name: "Jalebi", price: "₹100" },
                        { name: "Rice Kheer", price: "₹130" },
                        { name: "Rasgulla", price: "₹140" },
                        { name: "Malpua", price: "₹160" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b pb-2">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Beverages Section */}
                  <div>
                    <h3 className="text-xl font-bold text-[#5c2018] mb-4">Beverages</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "Masala Chai", price: "₹60" },
                        { name: "Mango Lassi", price: "₹90" },
                        { name: "Badam Milk", price: "₹100" },
                        { name: "Fresh Lime Soda", price: "₹70" },
                        { name: "Cold Coffee", price: "₹120" },
                        { name: "Fresh Fruit Juices", price: "₹110" },
                        { name: "Mineral Water", price: "₹40" },
                        { name: "Soft Drinks", price: "₹60" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b pb-2">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5c2018]">Customer Reviews</h2>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="py-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                  <div className="p-6 bg-[#f9f5f0] rounded-lg text-center h-full">
                    <div className="flex justify-center mb-4">
                      {Array(review.rating).fill(0).map((_, i) => (
                        <span key={i} className="text-[#f3bf7a] text-xl">★</span>
                      ))}
                    </div>
                    <p className="italic mb-4 text-gray-700">"{review.review}"</p>
                    <p className="font-semibold">- {review.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
          
          <div className="text-center mt-8">
            <a 
              href="https://maps.app.goo.gl/5fvBgEfAwJvqTWrUA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#5c2018] hover:text-[#421410] inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              See all reviews on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-16 bg-[#f9f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5c2018]">Make a Reservation</h2>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleReservation} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c2018]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c2018]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c2018]"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select 
                    id="guests" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c2018]"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                  >
                    {[1,2,3,4,5,6,7,8,10,12].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c2018]"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    id="time" 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c2018]"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Button type="submit" className="bg-[#5c2018] hover:bg-[#421410] px-8">
                  Book Table
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5c2018]">Find Us</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-[#5c2018]">Contact Information</h3>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#5c2018]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    MP Nagar Zone 1, Bhopal, Madhya Pradesh 462011
                  </p>
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#5c2018]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 7456 123 456
                  </p>
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#5c2018]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@mamarestaurant.com
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#5c2018]">Hours of Operation</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Monday - Thursday</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Friday - Saturday</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>12:00 PM - 10:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14664.938280308929!2d77.41221807426758!3d23.233367999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f66!2sMP%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh%20462011!5e0!3m2!1sen!2sin!4v1714156696074!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#5c2018] to-[#7a2b20] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">Mama</h3>
              <p className="mb-4">The Family Restaurant - Where every meal feels like home.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-[#f3bf7a]">About Us</a></li>
                <li><a href="#menu" className="hover:text-[#f3bf7a]">Our Menu</a></li>
                <li><a href="#reserve" className="hover:text-[#f3bf7a]">Reservations</a></li>
                <li><a href="#contact" className="hover:text-[#f3bf7a]">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Exciting Offers</h3>
              <p className="mb-4">Subscribe to get special offers and news about our food festivals!</p>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="rounded-l-none bg-[#f3bf7a] text-[#5c2018] hover:bg-[#e0a85c]">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/20 text-center">
            <p>&copy; {new Date().getFullYear()} Mama - The Family Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
