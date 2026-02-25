import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { insertContactMessageSchema } from "@shared/schema";
import type { ContactMessageInput } from "@shared/routes";
import { useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function Contact() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  
  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactMessageInput) => {
    submitMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for reaching out. I will get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 blur-[100px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Begin Your Healing <br className="hidden md:block"/> Journey Today
            </h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-md font-light">
              Whether you're looking for spiritual guidance, energy healing, or a custom sigil, I am here to help. Reach out to schedule a consultation.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Email</p>
                  <p className="text-foreground font-medium">connect@auramystic.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Phone</p>
                  <p className="text-foreground font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Location</p>
                  <p className="text-foreground font-medium">Sanctuary of Light, CA (Available Globally via Zoom)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="h-12 bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@example.com" type="email" className="h-12 bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can I assist you on your journey?" 
                          className="min-h-[120px] resize-none bg-background" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 text-base rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Sending..." : (
                    <>Send Message <Send className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
