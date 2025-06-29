import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import ai from "@/assets/ai.png";
import comm from "@/assets/comm.png";
import tips from "@/assets/tips.png";

const blogPosts = [
	{
		id: 1,
		title: "15 Advanced Streaming Techniques to Grow Your Channel",
		excerpt:
			"Discover cutting-edge strategies that top creators use to enhance stream quality and expand their audience in 2025.",
		content:
			"Streaming has evolved significantly in recent years, and staying ahead requires adopting the latest techniques. This article explores 15 advanced strategies that can help grow your channel and engage your audience effectively. From optimizing your stream settings to leveraging multi-platform distribution, we cover everything you need to know to take your content to the next level.",
		image: tips,
		date: "June 10, 2025",
		slug: "top-10-streaming-tips",
	},
	{
		id: 2,
		title: "AI-Powered Streaming: What to Expect in 2026",
		excerpt:
			"Explore how artificial intelligence is revolutionizing content creation, personalization, and viewer engagement.",
		content:
			"Artificial intelligence is transforming the streaming landscape at an unprecedented pace. From automatic content moderation to personalized viewing experiences, AI is becoming an essential tool for streamers and platforms alike. This article examines the upcoming AI innovations expected to reshape streaming in 2026 and how content creators can prepare to leverage these technologies.",
		image: ai,
		date: "May 22, 2025",
		slug: "future-of-video-streaming",
	},
	{
		id: 3,
		title: "Building a Loyal Community Around Your Content",
		excerpt:
			"Learn proven community-building tactics that transform casual viewers into dedicated fans and boost engagement metrics.",
		content:
			"The difference between successful content creators and those who struggle often comes down to community. In this in-depth guide, we explore strategies for cultivating an engaged, supportive community around your content. From creating meaningful interactions to organizing virtual and in-person events, discover how to transform passive viewers into active participants and advocates for your brand.",
		image: comm,
		date: "April 30, 2025",
		slug: "build-audience-strategy",
	},
];

const BlogSection = () => {
	const [selectedPost, setSelectedPost]: any = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (post: any) => {
		setSelectedPost(post);
		setIsModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.style.overflow = "auto";
	};

	return (
		<div className="container mx-auto py-6">
			<div className="text-center mb-8">
				<h2 className="text-2xl md:text-3xl font-bold mb-2">
					Latest from our <span className="text-primary">Blog</span>
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					Experience video sharing with zero interruptions and complete creative
					freedom
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				{blogPosts.map((post) => (
					<div
						key={post.id}
						className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
					>
						<div className="h-48 bg-muted/50 relative overflow-hidden">
							<img
								src={post.image}
								alt={post.title}
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
						<div className="p-5">
							<p className="text-xs text-muted-foreground mb-2">
								{post.date}
							</p>
							<h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
							<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
								{post.excerpt}
							</p>
							<button
								onClick={() => openModal(post)}
								className="text-sm text-primary hover:underline inline-flex items-center gap-1"
							>
								Read more <ArrowRight size={14} />
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			{isModalOpen && selectedPost && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 md:p-6">
					<div className="bg-card rounded-lg w-full max-w-[95%] md:max-w-3xl lg:max-w-4xl max-h-[80vh] md:max-h-[85vh] overflow-y-auto">
						<div className="p-4 md:p-8">
							<div className="flex justify-between items-start mb-6">
								<h2 className="text-xl md:text-2xl font-bold pr-4">
									{selectedPost.title}
								</h2>
								<button
									onClick={closeModal}
									className="p-1 hover:bg-muted rounded-full flex-shrink-0"
								>
									<X size={24} />
								</button>
							</div>

							<p className="text-xs md:text-sm text-muted-foreground mb-6">
								{selectedPost.date}
							</p>

							<div className="h-48 md:h-64 bg-muted/50 relative mb-6 rounded-md overflow-hidden">
								<img
									src={selectedPost.image}
									alt={selectedPost.title}
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
								<p>{selectedPost.content}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BlogSection;
