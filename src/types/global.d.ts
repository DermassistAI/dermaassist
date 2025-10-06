// Declarations for importing CSS and static assets in TypeScript
declare module '*.css'
declare module '*.scss'
declare module '*.module.css'
declare module '*.module.scss'

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'

declare module '*.svg' {
  const content: string
  export default content
}

// Allow importing raw text files if needed
declare module '*.txt'
