import { Component, type ReactNode } from 'react';

     interface ErrorBoundaryProps {
       children: ReactNode;
     }

     interface ErrorBoundaryState {
       hasError: boolean;
     }

     class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
       constructor(props: ErrorBoundaryProps) {
         super(props);
         this.state = { hasError: false };
       }

       static getDerivedStateFromError(): ErrorBoundaryState {
         return { hasError: true };
       }

       render() {
         if (this.state.hasError) {
           return <h1>Something went wrong. Please refresh the page.</h1>;
         }
         return this.props.children;
       }
     }

     export default ErrorBoundary;