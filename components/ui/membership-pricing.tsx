"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { Coffee, Users, Clock, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Luxe Member",
    description:
      "Perfect for avid coffee lovers. Enjoy exclusive discounts and special perks every time you visit.",
    price: 15,
    yearlyPrice: 120,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    features: [
      { text: "10% off all drinks", icon: <Coffee size={20} /> },
      { text: "Priority seating", icon: <Users size={20} /> },
      { text: "Free birthday drink", icon: <Clock size={20} /> },
    ],
    includes: [
      "Free includes:",
      "Monthly newsletter",
      "Special member events",
      "Custom background & stickers",
    ],
  },
  {
    name: "Bronze Member",
    description:
      "Ideal for professionals needing a reliable workspace. Get access to premium amenities and services.",
    price: 45,
    yearlyPrice: 450,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    features: [
      { text: "1 hour office time/week", icon: <Coffee size={20} /> },
      { text: "150 printed pages/month", icon: <Users size={20} /> },
      { text: "10% off all drinks", icon: <Clock size={20} /> },
    ],
    includes: [
      "Everything in Luxe, plus:",
      "WiFi priority access",
      "Meeting room access",
      "Dedicated workspace",
    ],
  },
  {
    name: "Gold Member",
    description:
      "Premium plan with enhanced benefits and unlimited access for serious professionals and teams.",
    price: 95,
    yearlyPrice: 950,
    popular: true,
    buttonText: "Get started",
    buttonVariant: "default" as const,
    features: [
      { text: "Unlimited office time", icon: <Coffee size={20} /> },
      { text: "Unlimited printing", icon: <Users size={20} /> },
      { text: "20% off all drinks", icon: <Clock size={20} /> },
    ],
    includes: [
      "Everything in Bronze, plus:",
      "Private office access",
      "Team collaboration space",
      "Premium coffee selection",
    ],
  },
];

const PricingSwitch = ({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-cream border border-primary/20 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit sm:h-12 cursor-pointer h-10  rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0"
              ? "text-white"
              : "text-dark-blue/60 hover:text-dark-blue",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-2 shadow-lg shadow-primary/30 border-primary bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit cursor-pointer sm:h-12 h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1"
              ? "text-white"
              : "text-dark-blue/60 hover:text-dark-blue",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10  w-full  rounded-full border-2 shadow-lg shadow-primary/30 border-primary bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Yearly
            <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-dark-blue">
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function MembershipPricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="px-4 pt-20 pb-20 max-w-7xl mx-auto relative"
      ref={pricingRef}
    >
      <article className="flex sm:flex-row flex-col sm:pb-0 pb-4 sm:items-center items-start justify-between">
        <div className="text-left mb-6">
          <p className="text-sm uppercase tracking-wider text-dark-blue/70 font-semibold mb-3">
            LUXE MEMBERSHIPS
          </p>
          <h2 className="text-4xl font-medium leading-[130%] text-dark-blue mb-4">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-start"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0,
              }}
            >
              Better way to do business
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-dark-blue/70 w-[90%] lg:w-[80%]"
          >
            Choose a membership plan that fits your lifestyle. Unlock exclusive benefits,
            discounts, and premium experiences at LUXE CAFE.
          </TimelineContent>
        </div>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} className="shrink-0" />
        </TimelineContent>
      </article>

      <TimelineContent
        as="div"
        animationNum={2}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="grid md:grid-cols-3 gap-4 mx-auto sm:p-3 rounded-lg mt-12"
      >
        {plans.map((plan, index) => (
          <TimelineContent
            as="div"
            key={plan.name}
            animationNum={index + 3}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <motion.div
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              onClick={() => setSelectedCard(plan.name)}
              className="h-full group"
            >
              <Card
                className={`relative flex-col flex justify-between h-full transition-all duration-300 cursor-pointer overflow-hidden ${
                  selectedCard === plan.name
                    ? "ring-2 ring-primary bg-gradient-to-b from-primary to-primary/90 text-white shadow-2xl shadow-primary/40"
                    : "border border-gray-200 shadow-md bg-white pt-4 text-dark-blue hover:shadow-2xl hover:shadow-primary/40"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && selectedCard !== plan.name && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {/* Hover Background Overlay for non-selected cards */}
                {selectedCard !== plan.name && (
                  <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                )}
                
                <div className="relative z-10">
              
              <CardContent className="pt-6 pb-4 px-8">
                <div className="space-y-4 pb-4">


                  <div className="flex items-baseline">
                    <span className={`text-4xl font-semibold transition-colors duration-300 ${selectedCard !== plan.name && 'group-hover:text-white'}`}>
                      $
                      <NumberFlow
                        format={{
                          currency: "USD",
                        }}
                        value={isYearly ? plan.yearlyPrice : plan.price}
                        className="text-4xl font-semibold"
                      />
                    </span>
                    <span
                      className={
                        selectedCard === plan.name
                          ? "text-white/70 ml-1"
                          : "text-dark-blue/60 group-hover:text-white/70 ml-1 transition-colors duration-300"
                      }
                    >
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-2">
                  <h3 className={`text-3xl font-semibold mb-3 transition-colors duration-300 ${selectedCard !== plan.name && 'group-hover:text-white'}`}>{plan.name}</h3>
                </div>
                <p
                  className={
                    selectedCard === plan.name
                      ? "text-sm text-white/80 mb-6 leading-relaxed"
                      : "text-sm text-dark-blue/70 group-hover:text-white/80 mb-6 leading-relaxed transition-colors duration-300"
                  }
                >
                  {plan.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-white/20">
                  <h4 className={`font-medium text-base mb-4 transition-colors duration-300 ${selectedCard !== plan.name && 'group-hover:text-white'}`}>
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-3 font-semibold">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span
                          className={
                            selectedCard === plan.name
                              ? "text-dark-blue h-6 w-6 bg-cream border border-cream rounded-full grid place-content-center mt-0.5 mr-3"
                              : "text-white h-6 w-6 bg-primary group-hover:bg-cream group-hover:text-dark-blue border border-primary group-hover:border-cream rounded-full grid place-content-center mt-0.5 mr-3 transition-all duration-300"
                          }
                        >
                          <CheckCheck className="h-4 w-4" />
                        </span>
                        <span
                          className={
                            selectedCard === plan.name
                              ? "text-sm text-white/90"
                              : "text-sm text-dark-blue/70 group-hover:text-white/90 transition-colors duration-300"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="px-8 pt-4 pb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full p-5 text-xl font-semibold rounded-xl transition-all ${
                    selectedCard === plan.name
                      ? "bg-primary shadow-lg shadow-primary/50 border-2 border-primary text-white hover:bg-white hover:text-primary hover:shadow-xl"
                      : "bg-primary shadow-lg shadow-primary/30 border-2 border-primary text-white hover:bg-white hover:text-primary hover:shadow-xl"
                  }`}
                >
                  {plan.buttonText}
                </motion.button>
              </CardFooter>
                </div>
              </Card>
            </motion.div>
          </TimelineContent>
        ))}
      </TimelineContent>
    </div>
  );
}
