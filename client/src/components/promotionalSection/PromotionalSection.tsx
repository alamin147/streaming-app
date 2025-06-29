const PromotionalSection = () => {
  return (
    <div className="mx-4 md:mx-0 pb-8 bg-card/50 rounded-xl">
      <div className="mx-auto py-8 px-4 md:px-14">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose <span className="text-primary">N-Movies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience video sharing with zero interruptions and complete
            creative freedom
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <div className="mb-5 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary cursor-pointer"
                >
                  <path
                    d="M22 9L12 5L2 9L12 13L22 9ZM22 9V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 11.5V16.5C6 17.5 7 19 12 19C17 19 18 17.5 18 16.5V11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">
              Completely Free
            </h3>
            <p className="text-muted-foreground text-center">
              No subscriptions, no paywalls. Just pure content when you want it.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <div className="mb-5 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary cursor-pointer"
                >
                  <path
                    d="M8 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">
              Creator Freedom
            </h3>
            <p className="text-muted-foreground text-center">
              Upload unlimited content and grow your audience with ease.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <div className="mb-5 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary cursor-pointer"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">
              Privacy First
            </h3>
            <p className="text-muted-foreground text-center">
              Your data stays yours. We never sell it or use it for ads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalSection;
