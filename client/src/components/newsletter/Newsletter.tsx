import { useState } from "react";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      toast.success("Subscribed successfully!");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="mx-8 md:container md:mx-auto py-6 bg-card/50 ">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
        <p className="text-muted-foreground mb-6 md:mb-8">
          Subscribe to our newsletter for the latest updates on new features,
          content, and creator tips
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/70 text-black font-medium py-2.5 px-6 rounded-lg transition-colors"
          >
            {isSubmitting
              ? "Subscribing..."
              : isSuccess
              ? "Subscribed!"
              : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;
