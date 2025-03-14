
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface Quiz {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quiz: Quiz = {
  title: "Advanced React Concepts Quiz",
  description: "Test your knowledge of advanced React concepts and patterns.",
  questions: [
    {
      question: "What is the purpose of React.memo()?",
      options: [
        "To memoize the rendered component and avoid re-renders if props haven't changed",
        "To create a memoized version of a callback function",
        "To cache the result of expensive calculations",
        "To create a reference to a value that persists across renders"
      ],
      correctAnswer: 0,
      hint: "This is related to performance optimization by preventing unnecessary re-renders."
    },
    {
      question: "Which hook would you use to perform side effects in your component?",
      options: [
        "useState()",
        "useEffect()",
        "useContext()",
        "useReducer()"
      ],
      correctAnswer: 1,
      hint: "This hook runs after render and is used for things like data fetching, subscriptions, or manually changing the DOM."
    },
    {
      question: "What does React.lazy() enable in your application?",
      options: [
        "Faster rendering of components",
        "Automatic memoization of components",
        "Code splitting and dynamic imports",
        "Server-side rendering"
      ],
      correctAnswer: 2,
      hint: "This feature is related to performance optimization by loading certain parts of your app only when they're needed."
    },
    {
      question: "What is the purpose of the useCallback() hook?",
      options: [
        "To memoize a component",
        "To memoize a value",
        "To memoize a function",
        "To create refs"
      ],
      correctAnswer: 2,
      hint: "This hook is particularly useful when passing callbacks to optimized child components."
    },
    {
      question: "In a React context, what is 'prop drilling'?",
      options: [
        "A technique to optimize performance",
        "Passing props through multiple levels of components",
        "A way to validate props",
        "A pattern for accessing DOM elements"
      ],
      correctAnswer: 1,
      hint: "This term refers to a potential issue when sharing data between components that aren't direct parent-child."
    },
    {
      question: "What is the StrictMode component in React used for?",
      options: [
        "Enforcing type checking at runtime",
        "Optimizing performance in production",
        "Highlighting potential problems in the application",
        "Enabling the new React concurrent mode"
      ],
      correctAnswer: 2,
      hint: "This is a development-only feature that helps identify problems early."
    },
    {
      question: "Which of these is NOT a React Hook?",
      options: [
        "useRef()",
        "useEffect()",
        "useDispatch()",
        "useLayoutEffect()"
      ],
      correctAnswer: 2,
      hint: "One of these is actually from a popular state management library, not from React core."
    },
    {
      question: "What is the key difference between useEffect and useLayoutEffect?",
      options: [
        "useLayoutEffect runs synchronously after DOM mutations",
        "useEffect can handle asynchronous operations while useLayoutEffect cannot",
        "useLayoutEffect works in server-side rendering while useEffect doesn't",
        "There is no difference; they are aliases of the same function"
      ],
      correctAnswer: 0,
      hint: "Think about the timing of when these hooks execute in relation to when the user sees updates."
    },
    {
      question: "What does the 'key' prop do in React lists?",
      options: [
        "Makes elements in the list focusable",
        "Helps React identify which items have changed, been added, or removed",
        "Provides an easy way to apply CSS to list items",
        "Creates a unique URL endpoint for each list item"
      ],
      correctAnswer: 1,
      hint: "This prop is essential for performance and correctness when rendering dynamic lists."
    },
    {
      question: "What is the React context API primarily used for?",
      options: [
        "Server-side rendering",
        "State management across components without prop drilling",
        "Handling form submissions",
        "Creating reusable components"
      ],
      correctAnswer: 1,
      hint: "This feature helps solve a specific problem related to sharing data between components."
    },
    {
      question: "What is a React Fragment?",
      options: [
        "A type of React component that only renders once",
        "A wrapper that lets you group elements without adding a node to the DOM",
        "A tool for splitting code into loadable chunks",
        "A method for creating partial components"
      ],
      correctAnswer: 1,
      hint: "This feature solves the problem of returning multiple elements from a component."
    },
    {
      question: "What is the purpose of React Portal?",
      options: [
        "To render children into a DOM node outside the parent component's DOM hierarchy",
        "To create reusable component logic",
        "To enable server-side rendering",
        "To optimize large list rendering"
      ],
      correctAnswer: 0,
      hint: "This feature is useful for components like modals, tooltips, and dropdowns."
    },
    {
      question: "When implementing forms in React, what is the term for controlling form inputs through React state?",
      options: [
        "Form hooks",
        "Controlled components",
        "React forms",
        "Form watchers"
      ],
      correctAnswer: 1,
      hint: "This pattern involves React state being the 'single source of truth' for input values."
    },
    {
      question: "What is the purpose of the useMemo() hook?",
      options: [
        "To create memoized callback functions",
        "To create a mutable ref object",
        "To memoize expensive calculated values",
        "To manage component state"
      ],
      correctAnswer: 2,
      hint: "This hook helps with performance by avoiding recalculations of values on every render."
    },
    {
      question: "What is 'code splitting' in React?",
      options: [
        "Dividing code between server and client",
        "Breaking down components into smaller functions",
        "Separating app into loadable bundles to improve performance",
        "Organizing code into different files"
      ],
      correctAnswer: 2,
      hint: "This technique is about optimizing bundle size and load times."
    },
    {
      question: "What's the primary use case for the useRef() hook?",
      options: [
        "State management",
        "Accessing DOM elements directly and storing mutable values",
        "Creating context providers",
        "Managing side effects"
      ],
      correctAnswer: 1,
      hint: "This hook provides a way to keep values between renders without causing re-renders."
    },
    {
      question: "What is a Higher-Order Component (HOC) in React?",
      options: [
        "A component with more than 100 lines of code",
        "A function that takes a component and returns a new enhanced component",
        "A component that renders multiple components",
        "A component at the top of the component tree"
      ],
      correctAnswer: 1,
      hint: "This pattern is used for reusing component logic and follows a similar pattern to higher-order functions."
    },
    {
      question: "What is the 'children' prop in React?",
      options: [
        "A special property for passing data to child components",
        "A render prop for conditional rendering",
        "The content between opening and closing tags of a component",
        "A prop for defining child routes"
      ],
      correctAnswer: 2,
      hint: "This prop is automatically passed to components and represents a special type of content."
    },
    {
      question: "What do React Error Boundaries do?",
      options: [
        "Add try/catch blocks to functional components",
        "Catch JavaScript errors anywhere in the component tree and display fallback UI",
        "Validate props and state before rendering",
        "Prevent network request errors"
      ],
      correctAnswer: 1,
      hint: "This feature helps improve user experience by preventing the whole app from crashing."
    },
    {
      question: "What is the recommended way to optimize context API if the context value changes frequently?",
      options: [
        "Use Redux instead",
        "Split contexts into smaller, more focused ones",
        "Use useState instead of context",
        "Apply memoization to context values"
      ],
      correctAnswer: 1,
      hint: "This approach minimizes unnecessary re-renders of components that consume context."
    }
  ]
};
