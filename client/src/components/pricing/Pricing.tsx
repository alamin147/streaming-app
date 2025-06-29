import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="mx-8 md:container md:mx-auto  py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Choose Your <span className="text-primary">Plan</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Start with our free tier or upgrade for premium features
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-colors flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Basic</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground text-sm mb-1">/forever</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Everything you need to watch and share videos
            </p>
          </div>

          <div className="flex-grow">
            <div className="h-px w-full bg-border mb-4"></div>
            <ul className="space-y-2 text-sm">
              <FeatureItem text="Unlimited video watching" />
              <FeatureItem text="Ad-free experience" />
              <FeatureItem text="720p video quality" />
              <FeatureItem text="Basic search features" />
              <FeatureItem text="Create a watchlist" />
            </ul>
          </div>
        </div>

        {/* Standard Plan */}
        <div className="relative bg-card p-5 rounded-lg border border-primary shadow-sm flex flex-col h-full">
          <div className="absolute -top-3 right-6 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-medium">
            Recommended
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Standard</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="text-muted-foreground text-sm mb-1">/month</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Enhanced features for serious viewers and creators
            </p>
          </div>

          <div className="flex-grow">
            <div className="h-px w-full bg-border mb-4"></div>
            <ul className="space-y-2 text-sm">
              <FeatureItem text="Everything in Basic" />
              <FeatureItem text="4K video quality" />
              <FeatureItem text="Download videos offline" />
              <FeatureItem text="Advanced search" />
              <FeatureItem text="Priority support" />
              <FeatureItem text="No storage limits" />
            </ul>
          </div>

          <div className="mt-6">
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium text-sm transition-colors">
              Upgrade to Standard
            </button>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="relative bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-colors flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold">$12.99</span>
              <span className="text-muted-foreground text-sm mb-1">/month</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Ultimate experience for professional creators
            </p>
          </div>

          <div className="flex-grow">
            <div className="h-px w-full bg-border mb-4"></div>
            <ul className="space-y-2 text-sm">
              <FeatureItem text="Everything in Standard" />
              <FeatureItem text="8K video quality" />
              <FeatureItem text="Early access to new features" />
              <FeatureItem text="Premium analytics tools" />
              <FeatureItem text="Dedicated account manager" />
              <FeatureItem text="Custom branding options" />
              <FeatureItem text="Report Review priority" />
            </ul>
          </div>

          <div className="mt-6">
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium text-sm transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for feature items with checkmarks
const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <div className="mt-0.5 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
      <Check size={10} className="text-primary" />
    </div>
    <span>{text}</span>
  </li>
)

export default Pricing
