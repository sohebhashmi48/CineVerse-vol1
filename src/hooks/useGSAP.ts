import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline();
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    timeline: timelineRef.current,
    gsap,
    ScrollTrigger
  };
};

export const useParallax = (ref: React.RefObject<HTMLElement>, speed: number = 0.3) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    gsap.to(element, {
      yPercent: -30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, speed]);
};

export const use3DCardEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let isHovering = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -5; // Reduced from -10
      const rotateY = (x - centerX) / centerX * 5;  // Reduced from 10
      
      gsap.to(element, {
        duration: 0.2, // Faster response
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        ease: "power1.out" // Lighter easing
      });
    };
    
    const handleMouseEnter = () => {
      isHovering = true;
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      gsap.to(element, {
        duration: 0.2,
        rotationX: 0,
        rotationY: 0,
        ease: "power1.out"
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
};