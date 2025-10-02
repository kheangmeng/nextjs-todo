export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development with React',
    author: 'Alex Johnson',
    date: 'September 28, 2025',
    imageUrl: 'https://placehold.co/600x400/1d4ed8/ffffff?text=React+Future&font=inter',
    category: 'Frameworks',
    tags: ['React', 'JavaScript', 'Web Development'],
    excerpt: 'React continues to dominate the front-end landscape. In this post, we explore the latest features, community trends, and what to expect from React in the coming years.',
    content: `
      <p>React has fundamentally changed how we build user interfaces. Its component-based architecture allows for reusable and maintainable code, which is why it has been adopted by companies big and small.</p>
      <p class="mt-4">The introduction of Hooks was a game-changer, simplifying state management and side effects in functional components. Now, with the ongoing development of features like Server Components, React is pushing the boundaries of performance and developer experience even further.</p>
      <h3 class="text-2xl font-bold mt-6 mb-2 text-slate-800">What are Server Components?</h3>
      <p>Server Components allow developers to write React components that run exclusively on the server. This means they can access the backend directly, fetching data without the need for client-side API calls. The result is a faster initial page load and less JavaScript shipped to the browser. This is a significant step towards building highly performant web applications that feel snappy and responsive.</p>
      <p class="mt-4">We are excited to see how the community adopts these new patterns and the innovative applications that will be built with them. The future of React is not just about making UIs; it's about optimizing the entire data-fetching and rendering pipeline.</p>
    `
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS for Rapid UI Development',
    author: 'Jane Doe',
    date: 'September 25, 2025',
    imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Tailwind+CSS&font=inter',
    category: 'Styling',
    tags: ['Tailwind CSS', 'CSS', 'UI/UX'],
    excerpt: 'Tired of writing custom CSS for every component? Tailwind CSS offers a utility-first approach that can dramatically speed up your development workflow. Let\'s dive in.',
    content: `
      <p>Tailwind CSS is more than just a CSS framework; it's a new way of thinking about styling. Instead of pre-defined components like in Bootstrap, Tailwind provides low-level utility classes that you can compose to build any design directly in your HTML (or JSX).</p>
      <p class="mt-4">This approach has several advantages:</p>
      <ul class="list-disc list-inside mt-2 space-y-2">
        <li>You aren't fighting with framework styles you need to override.</li>
        <li>Your CSS bundle size remains small because you only include the utilities you actually use.</li>
        <li>It's easier to maintain a consistent design system across your application.</li>
      </ul>
      <h3 class="text-2xl font-bold mt-6 mb-2 text-slate-800">Getting Started</h3>
      <p>The best way to learn Tailwind is by doing. Start a new project, install it via npm, and begin styling your components. You'll be surprised at how intuitive and fast it becomes once you get used to the class names. The official documentation is also an incredible resource with searchable guides for every CSS property you can imagine.</p>
    `
  },
  {
    id: 3,
    title: 'A Guide to Modern JavaScript: ES2025 and Beyond',
    author: 'Sam Smith',
    date: 'September 22, 2025',
    imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Modern+JS&font=inter',
    category: 'JavaScript',
    tags: ['ES2025', 'Core JS', 'Best Practices'],
    excerpt: 'JavaScript is constantly evolving. This guide will walk you through some of the most impactful new features that will help you write cleaner, more efficient, and more powerful code.',
    content: `
      <p>The ECMAScript standard continues to bring powerful new features to JavaScript every year. From optional chaining (?.) and nullish coalescing (??) to new methods for arrays and strings, the language is more robust than ever.</p>
      <p class="mt-4">Keeping up with these changes is crucial for any modern web developer. It not only allows you to write better code but also helps you understand the libraries and frameworks you use on a deeper level, as they often leverage these new features internally.</p>
      <h3 class="text-2xl font-bold mt-6 mb-2 text-slate-800">Key Features to Know</h3>
      <ul class="list-disc list-inside mt-2 space-y-2">
        <li><strong>Array.prototype.at():</strong> A simpler way to get an element from the end of an array.</li>
        <li><strong>Object.hasOwn():</strong> A more robust way to check for an object's own properties.</li>
        <li><strong>Private Class Fields:</strong> True private members for your classes using the # prefix.</li>
      </ul>
      <p class="mt-4">Embracing these features will make your code more readable and less prone to bugs. Dive into the official specifications and start experimenting in your projects today!</p>
    `
  },
  {
    id: 4,
    title: 'Getting Started with Vue.js 3',
    author: 'Alex Johnson',
    date: 'September 20, 2025',
    imageUrl: 'https://placehold.co/600x400/41b883/ffffff?text=Vue.js+3&font=inter',
    category: 'Frameworks',
    tags: ['Vue.js', 'JavaScript', 'Frontend'],
    excerpt: 'A comprehensive look into Vue.js 3, its composition API, and how it compares to other modern frameworks.',
    content: `<p>Vue.js continues to be a popular choice for developers looking for a progressive and approachable framework. With version 3, Vue introduced the Composition API, offering a more flexible and scalable way to organize component logic.</p><p class="mt-4">This guide will walk you through setting up your first Vue 3 project, understanding the core concepts, and building a simple application.</p>`
  }
];