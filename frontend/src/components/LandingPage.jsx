import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, MessageCircle, Shield, Clock, Users, ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Heart,
      title: "Compassionate Support",
      description: "Talk through your concerns in a caring, judgment-free environment",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your conversations are private and secure, just between you and our AI counsellor",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: Clock,
      title: "Available 24/7",
      description: "Get support whenever you need it, day or night, no appointment necessary",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Thoughtful Guidance",
      description: "Receive empathetic responses and practical coping strategies",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const testimonials = [
    {
      text: "This space helped me process my anxiety in a way I never could before. I felt truly heard.",
      author: "Sarah M.",
      role: "3rd Year Student"
    },
    {
      text: "Having access to support at 2am when I was struggling made all the difference.",
      author: "Alex K.",
      role: "Graduate Student"
    },
    {
      text: "The guidance I received helped me develop healthier coping mechanisms for stress.",
      author: "Jordan T.",
      role: "2nd Year Student"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-200 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-700 rounded-full mix-blend-lighten blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-700 rounded-full mix-blend-lighten blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-700 rounded-full mix-blend-lighten blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-700 rounded-full mix-blend-lighten blur-3xl animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative z-10">

        <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <div className="text-center animate-fade-in">

            <div className="inline-flex items-center justify-center mb-6 bg-slate-800/70 backdrop-blur-md px-10 py-4 rounded-full shadow-xl border border-slate-700">
              <Sparkles className="w-8 h-8 text-teal-400 mr-3 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                Student Wellness Space
              </h1>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight">
              You Don't Have to Face
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Challenges Alone
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A safe, confidential space powered by AI to help you navigate stress, anxiety, 
              academic pressure, and life's ups and downs. Talk freely, anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/counselling"
                className="group px-8 py-4 bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2 text-lg font-semibold"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-slate-200 rounded-2xl hover:bg-slate-700/80 transition-all duration-300 shadow-lg border border-slate-700 text-lg font-semibold"
              >
                Learn More
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>Private & Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-400" />
                <span>Judgment-Free Zone</span>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Why Students Choose Our Space
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Designed specifically for students who need someone to talk to
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02] shadow-xl"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-100 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              What Students Are Saying
            </h3>
            <p className="text-slate-400 text-lg">
              Real experiences from students who found support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-xl hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-slate-800 pt-4">
                  <p className="text-slate-200 font-semibold">{testimonial.author}</p>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-10 md:p-12 border border-slate-800 shadow-2xl">
            <h3 className="text-3xl font-bold text-slate-100 mb-8 text-center">
              Getting Started Is Simple
            </h3>
            
            <div className="space-y-6">
              {[
                { step: "1", title: "Click 'Start a Conversation'", description: "No sign-up required. Jump right in whenever you need support." },
                { step: "2", title: "Share What's On Your Mind", description: "Type freely about what you're experiencing. Choose a quick prompt or start fresh." },
                { step: "3", title: "Receive Thoughtful Support", description: "Get empathetic responses, coping strategies, and guidance tailored to your situation." }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center bg-gradient-to-br from-teal-900/40 to-cyan-900/40 backdrop-blur-xl rounded-3xl p-12 border border-teal-800/50 shadow-2xl">
            <Heart className="w-16 h-16 text-teal-400 mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Ready to Talk?
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Take the first step towards feeling better. Your wellness journey starts with a single conversation.
            </p>
            <Link
              to="/counselling"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl text-lg font-semibold"
            >
              Start Your Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-8 max-w-6xl border-t border-slate-800 mt-16">
          <div className="text-center text-slate-500 text-sm">
            <p className="mb-2">
              <strong className="text-slate-400">Important:</strong> This is an AI-powered support tool, not a replacement for professional mental health care.
            </p>
            <p>
              If you're experiencing a crisis, please contact your campus counseling center or call the National Crisis Hotline: 988
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}