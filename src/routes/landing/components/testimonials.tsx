import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ComponentProps } from "react";
import Marquee from "@/components/ui/marquee";

const testimonials = [
  {
    id: 1,
    name: "Mitanshu Salvi",
    designation: "Motion Designer",
    company: "Source",
    testimonial:
      "Squad Sync has been a game-changer for my workflow. Keeping projects organized and communicating with clients is now seamless!",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Shantanu Kulkarni",
    designation: "Freelancer",
    company: "Self-Employed",
    testimonial:
      "As a freelancer, staying connected with my team is crucial. Squad Sync makes it easy to collaborate and share files efficiently.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 3,
    name: "Pruthvi Shetty",
    designation: "Software Engineer",
    company: "Tech Solutions",
    testimonial:
      "Squad Sync has significantly improved our team's communication. The ability to create dedicated channels for different projects is incredibly helpful.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 4,
    name: "Soham Tamboli",
    designation: "Software Engineer",
    company: "Code Innovators",
    testimonial:
      "The user interface is intuitive, and the real-time messaging feature has made our daily stand-ups much more efficient. Squad Sync is a must-have!",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 5,
    name: "Sandesh Deore",
    designation: "Software Engineer",
    company: "Digital Dynamics",
    testimonial:
      "I appreciate the seamless file sharing and search functionality. Finding past conversations and documents is now a breeze.",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: 6,
    name: "Rushikesh Gadekar",
    designation: "Software Engineer",
    company: "Software Synergy",
    testimonial:
      "Squad Sync has become an essential tool for our team. It's streamlined our communication and made collaboration more efficient than ever.",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

const Testimonials = () => (
  <div id="testimonials" className="flex justify-center items-center py-20">
    <div className="h-full w-full">
      <h2 className="mb-12 text-4xl md:text-5xl font-bold text-center tracking-tight px-6">
        What Our Users Say About Squad Sync
      </h2>
      <div className="relative">
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent" />
        <Marquee pauseOnHover className="[--duration:60s]">
          <TestimonialList />
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-0 [--duration:40s]">
          <TestimonialList />
        </Marquee>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link to="#" target="_blank">
            <TwitterLogo className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default Testimonials;
