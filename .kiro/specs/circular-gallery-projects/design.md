# Design Document: Circular Gallery Projects Integration

## Overview

This design describes the integration of the existing CircularGallery component into the Projects section of a Next.js portfolio website. The integration involves replacing the current GSAP ScrollTrigger-based vertical scrolling animation with a WebGL-powered 3D circular carousel that provides an interactive, visually striking way to showcase projects.

The CircularGallery component is already implemented and uses the 'ogl' library for WebGL rendering. This design focuses on:
1. Adapting the Projects.tsx component to use CircularGallery
2. Transforming project data into the format required by CircularGallery
3. Configuring the gallery to match the portfolio's dark theme
4. Adding click interactions for project navigation
5. Ensuring proper cleanup and performance optimization

## Architecture

### Component Structure

```
Projects.tsx (Modified)
├── CircularGallery.jsx (Existing)
│   ├── App (WebGL Application)
│   │   ├── Renderer (OGL)
│   │   ├── Camera
│   │   ├── Scene
│   │   └── Media[] (Project Items)
│   │       ├── Mesh (Image Plane)
│   │       ├── Program (Shader)
│   │       └── Title (Text Texture)
│   └── Event Handlers (Mouse, Touch, Wheel)
└── ProjectModal (New - Optional)
    └── Project Details Display
```

### Data Flow

1. **Project Data** → Transformation → **Gallery Items** → CircularGallery
2. **User Interaction** → Event Handlers → **Scroll State** → Gallery Update
3. **Click Event** → Project Selection → **Navigation/Modal**

### Integration Points

- **Projects.tsx**: Main component that renders the Projects section
- **CircularGallery.jsx**: Existing WebGL gallery component (no modifications needed)
- **Project Data**: Array of project objects with image, title, category, date, and optional URL
- **Gallery Configuration**: Customization options passed as props to CircularGallery

## Components and Interfaces

### Modified Projects Component

**File**: `components/Projects.tsx`

**Purpose**: Render the Projects section with CircularGallery instead of GSAP ScrollTrigger animation

**Interface**:
```typescript
interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  url?: string;  // Optional external link
  description?: string;  // Optional detailed description
}

interface GalleryItem {
  image: string;
  text: string;
  projectData?: Project;  // Store full project data for click handling
}

interface ProjectsProps {
  // No props needed - uses internal project data
}
```

**Key Changes**:
1. Remove GSAP and ScrollTrigger imports and logic
2. Remove refs for images and texts (imagesRef, textsRef)
3. Remove ScrollTrigger animation setup in useEffect
4. Transform project data into GalleryItem format
5. Render CircularGallery component with configuration
6. Add click handler for project interactions

### Gallery Configuration

**Configuration Object**:
```typescript
interface GalleryConfig {
  items: GalleryItem[];
  bend: number;  // 0-5, controls circular curvature
  textColor: string;  // Hex color for text
  borderRadius: number;  // 0-1, normalized border radius
  font: string;  // CSS font string
  scrollSpeed: number;  // Multiplier for scroll sensitivity
  scrollEase: number;  // 0-1, easing factor for smooth scrolling
}
```

**Recommended Values for Dark Portfolio Theme**:
- `bend`: 3 (moderate circular curvature)
- `textColor`: '#ffffff' or '#e5e5e5' (light text on dark background)
- `borderRadius`: 0.05 (subtle rounded corners)
- `font`: 'bold 30px Figtree' (matches portfolio typography)
- `scrollSpeed`: 2 (moderate scroll sensitivity)
- `scrollEase`: 0.05 (smooth easing)

### Project Click Handler (New)

**Purpose**: Handle click events on gallery items to navigate to project URLs or show details

**Implementation Approach**:

Since CircularGallery doesn't currently support click events, we have two options:

**Option A: Modify CircularGallery to support onClick callback**
- Add `onClick` prop to CircularGallery
- Add click event listener to each Media mesh
- Distinguish between drag and click (track mouse movement)
- Call onClick with project data when clicked

**Option B: Overlay clickable elements**
- Position transparent clickable divs over gallery items
- Synchronize positions with WebGL rendering
- Handle clicks in React layer

**Recommended**: Option A (cleaner, more performant)

**Interface**:
```typescript
interface ClickHandler {
  (item: GalleryItem, index: number): void;
}
```

### Project Modal Component (Optional)

**File**: `components/ProjectModal.tsx` (New)

**Purpose**: Display detailed project information when a project without a URL is clicked

**Interface**:
```typescript
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**Features**:
- Full-screen or centered modal overlay
- Display project image, title, category, date, description
- Close button and click-outside-to-close
- Smooth open/close animations
- Accessible (keyboard navigation, focus trap)

## Data Models

### Project Data Structure

**Current Format** (in Projects.tsx):
```typescript
const projects = [
  {
    id: "01",
    title: "Slayer",
    category: " Photo Manipulation",
    date: "2021",
    image: "/assets/demon2.png",
  },
  // ...
];
```

**Extended Format** (with optional fields):
```typescript
const projects: Project[] = [
  {
    id: "01",
    title: "Slayer",
    category: "Photo Manipulation",
    date: "2021",
    image: "/assets/demon2.png",
    url: "https://example.com/slayer",  // Optional
    description: "A dark fantasy photo manipulation...",  // Optional
  },
  // ...
];
```

### Data Transformation

**Function**: `transformProjectsToGalleryItems`

```typescript
function transformProjectsToGalleryItems(projects: Project[]): GalleryItem[] {
  return projects.map(project => ({
    image: project.image,
    text: project.title,
    projectData: project,  // Store full project data
  }));
}
```

**Validation Rules**:
- Each project must have a valid image path
- Each project must have a non-empty title
- Image paths should be absolute or relative to public directory
- URLs should be valid HTTP/HTTPS URLs if provided

## Implementation Details

### Step 1: Update Projects Component Structure

**Remove**:
- GSAP and ScrollTrigger imports
- `containerRef`, `imagesRef`, `textsRef`
- `useEffect` with ScrollTrigger setup
- All GSAP animation code
- Scroll indicator elements
- Text overlay elements

**Add**:
- CircularGallery import
- Data transformation function
- Gallery configuration object
- Click handler function
- Optional: ProjectModal component and state

### Step 2: Configure Gallery for Dark Theme

**Section Container**:
```typescript
<section 
  id="gallery" 
  className="relative w-full h-screen bg-[#050505] overflow-hidden"
>
  <CircularGallery
    items={galleryItems}
    bend={3}
    textColor="#ffffff"
    borderRadius={0.05}
    font="bold 30px Figtree"
    scrollSpeed={2}
    scrollEase={0.05}
  />
</section>
```

**Styling Considerations**:
- Section should have `h-screen` to fill viewport height
- Background color should match portfolio theme (`bg-[#050505]`)
- Gallery will automatically fill the section container
- No additional padding or margins needed (gallery handles spacing)

### Step 3: Implement Click Interactions

**Modify CircularGallery Component**:

Add `onClick` prop to CircularGallery:
```javascript
export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05,
  onClick = null,  // New prop
}) {
  // Pass onClick to App class
  const app = new App(containerRef.current, { 
    items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onClick 
  });
}
```

**Add Click Detection to Media Class**:

```javascript
class Media {
  constructor({ /* existing params */, onClick }) {
    this.onClick = onClick;
    this.isDragging = false;
    this.dragStartX = 0;
    // ... existing code
    this.addClickListener();
  }
  
  addClickListener() {
    // This would require access to a DOM element or raycasting
    // Implementation depends on approach chosen
  }
  
  handleClick() {
    if (!this.isDragging && this.onClick) {
      this.onClick(this.galleryItem, this.index);
    }
  }
}
```

**Handle Clicks in Projects Component**:

```typescript
const handleProjectClick = (item: GalleryItem, index: number) => {
  const project = item.projectData;
  
  if (project?.url) {
    // Navigate to external URL
    window.open(project.url, '_blank', 'noopener,noreferrer');
  } else {
    // Show modal with project details
    setSelectedProject(project);
    setModalOpen(true);
  }
};
```

### Step 4: Add Project Modal (Optional)

**Component Structure**:
```typescript
export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-4xl w-full mx-4 bg-[#111] rounded-2xl overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>
        
        {/* Project Image */}
        <div className="relative w-full h-96">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>
        
        {/* Project Details */}
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-white/60 mb-4">{project.category} • {project.date}</p>
          {project.description && (
            <p className="text-white/80">{project.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Step 5: Cleanup and Performance

**WebGL Cleanup**:
- CircularGallery already implements cleanup in its `destroy()` method
- React's useEffect cleanup will automatically call destroy when component unmounts
- No additional cleanup needed

**Performance Optimizations**:
- CircularGallery already limits device pixel ratio to 2
- Uses requestAnimationFrame for smooth animations
- Debounces resize events
- Reuses geometry for all media items

**Additional Considerations**:
- Lazy load project images if there are many projects
- Consider using Next.js Image component for automatic optimization
- Monitor WebGL context loss and handle gracefully

## Alternative Approaches

### Approach 1: Full Replacement (Recommended)

**Description**: Completely replace the current Projects component with CircularGallery

**Pros**:
- Clean, simple implementation
- Consistent user experience
- Better performance (no unused code)

**Cons**:
- Loses existing GSAP animation
- More dramatic change to portfolio

### Approach 2: Hybrid Approach

**Description**: Keep both implementations and allow user to toggle between them

**Pros**:
- Preserves existing work
- Gives users choice
- Can A/B test which works better

**Cons**:
- More complex code
- Larger bundle size
- Potential confusion for users

### Approach 3: Side-by-Side

**Description**: Show both the GSAP animation and CircularGallery in different sections

**Pros**:
- Showcases both techniques
- No loss of existing work

**Cons**:
- Redundant content
- Longer page
- May feel repetitive

**Recommendation**: Use Approach 1 (Full Replacement) for simplicity and clean user experience.



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Data Transformation Completeness

*For any* array of valid Project objects, transforming them to GalleryItem format should produce items where:
- Each item has an `image` property matching the source project's image path
- Each item has a `text` property matching the source project's title
- Each item has a `projectData` property containing the complete original project object
- The number of gallery items equals the number of input projects

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 2: Gallery Items Duplication

*For any* array of gallery items passed to CircularGallery, the internal media array should contain exactly twice the number of items (duplicated for infinite scrolling)

**Validates: Requirements 4.4**

### Property 3: Configuration Value Validation

*For any* gallery configuration, the bend value should be a number between 0 and 5 (inclusive), and scrollSpeed and scrollEase should be positive numbers

**Validates: Requirements 3.1, 3.5**

### Property 4: Image Accessibility

*For any* project image rendered in the gallery or modal, there should be an associated alt text attribute that describes the project

**Validates: Requirements 9.1**

### Property 5: Color Contrast Compliance

*For any* text color configured for the gallery on a dark background (#050505), the contrast ratio should meet WCAG AA standards (minimum 4.5:1 for normal text)

**Validates: Requirements 9.4**

## Error Handling

### WebGL Context Loss

**Scenario**: WebGL context is lost due to browser limitations or GPU issues

**Handling**:
- CircularGallery should detect context loss via `webglcontextlost` event
- Display a fallback message or static image grid
- Attempt to restore context via `webglcontextrestored` event
- Log error for debugging

**Implementation**:
```javascript
gl.canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  console.error('WebGL context lost');
  // Show fallback UI
});

gl.canvas.addEventListener('webglcontextrestored', () => {
  console.log('WebGL context restored');
  // Reinitialize renderer
});
```

### Image Loading Failures

**Scenario**: Project image fails to load (404, network error, CORS issue)

**Handling**:
- Display placeholder image or colored rectangle
- Log error with image path for debugging
- Continue rendering other gallery items
- Provide fallback in Image component's onError handler

**Implementation**:
```typescript
<Image
  src={project.image}
  alt={project.title}
  fill
  onError={(e) => {
    console.error(`Failed to load image: ${project.image}`);
    e.currentTarget.src = '/assets/placeholder.png';
  }}
/>
```

### Invalid Project Data

**Scenario**: Project data is missing required fields (image, title)

**Handling**:
- Validate project data before transformation
- Filter out invalid projects with warning
- Ensure at least one valid project exists
- Throw error if no valid projects available

**Implementation**:
```typescript
function validateProject(project: Project): boolean {
  if (!project.image || !project.title) {
    console.warn(`Invalid project data:`, project);
    return false;
  }
  return true;
}

const validProjects = projects.filter(validateProject);
if (validProjects.length === 0) {
  throw new Error('No valid projects to display');
}
```

### Component Unmount During Animation

**Scenario**: User navigates away while gallery is animating

**Handling**:
- Cancel requestAnimationFrame in cleanup
- Remove all event listeners
- Dispose WebGL resources (textures, buffers)
- CircularGallery already implements this in destroy() method

**Verification**:
```typescript
useEffect(() => {
  // ... initialization
  return () => {
    // Cleanup is automatically called
    // Verify no memory leaks in dev tools
  };
}, []);
```

### Click During Drag

**Scenario**: User clicks but also drags slightly, causing ambiguity

**Handling**:
- Track drag distance during mouse/touch move
- Only trigger click if drag distance < threshold (e.g., 5 pixels)
- Set isDragging flag to prevent click on significant drags

**Implementation**:
```javascript
onTouchMove(e) {
  if (!this.isDown) return;
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const distance = Math.abs(this.start - x);
  
  if (distance > 5) {
    this.isDragging = true;
  }
  // ... existing scroll logic
}

handleClick() {
  if (!this.isDragging && this.onClick) {
    this.onClick(this.galleryItem, this.index);
  }
  this.isDragging = false;
}
```

## Testing Strategy

This feature requires both unit tests and property-based tests to ensure correctness and robustness.

### Unit Tests

Unit tests should focus on specific examples, edge cases, and integration points:

**Data Transformation Tests**:
- Test transformation of a single project
- Test transformation of empty project array
- Test transformation with missing optional fields (url, description)
- Test transformation with all fields present

**Configuration Tests**:
- Test gallery renders with default configuration
- Test gallery renders with custom configuration
- Test configuration with edge values (bend=0, bend=5)

**Click Handler Tests**:
- Test click with project that has URL (should call window.open)
- Test click with project without URL (should open modal)
- Test click handler receives correct project data

**Modal Tests**:
- Test modal opens when project is selected
- Test modal closes when close button clicked
- Test modal closes when backdrop clicked
- Test modal displays correct project information

**Cleanup Tests**:
- Test WebGL resources are cleaned up on unmount
- Test event listeners are removed on unmount

### Property-Based Tests

Property-based tests should verify universal properties across many generated inputs. Each test should run a minimum of 100 iterations.

**Test Library**: Use `fast-check` for TypeScript/JavaScript property-based testing

**Property Test 1: Data Transformation Completeness**
```typescript
// Feature: circular-gallery-projects, Property 1: Data transformation completeness
fc.assert(
  fc.property(
    fc.array(projectArbitrary, { minLength: 1, maxLength: 20 }),
    (projects) => {
      const galleryItems = transformProjectsToGalleryItems(projects);
      
      // Check length
      expect(galleryItems.length).toBe(projects.length);
      
      // Check each item
      galleryItems.forEach((item, i) => {
        expect(item.image).toBe(projects[i].image);
        expect(item.text).toBe(projects[i].title);
        expect(item.projectData).toEqual(projects[i]);
      });
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 2: Gallery Items Duplication**
```typescript
// Feature: circular-gallery-projects, Property 2: Gallery items duplication
fc.assert(
  fc.property(
    fc.array(galleryItemArbitrary, { minLength: 1, maxLength: 20 }),
    (items) => {
      // This would require testing the internal state of CircularGallery
      // We can test that the component receives the correct items
      // and verify the duplication happens in the Media creation
      const { container } = render(<CircularGallery items={items} />);
      
      // The internal medias array should have 2x items
      // This requires exposing internal state or using a test hook
      expect(getMediaCount(container)).toBe(items.length * 2);
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 3: Configuration Value Validation**
```typescript
// Feature: circular-gallery-projects, Property 3: Configuration validation
fc.assert(
  fc.property(
    fc.record({
      bend: fc.float({ min: 0, max: 5 }),
      scrollSpeed: fc.float({ min: 0.1, max: 10 }),
      scrollEase: fc.float({ min: 0.01, max: 0.5 }),
    }),
    (config) => {
      // Should not throw error with valid config
      expect(() => {
        render(
          <CircularGallery
            items={mockItems}
            bend={config.bend}
            scrollSpeed={config.scrollSpeed}
            scrollEase={config.scrollEase}
          />
        );
      }).not.toThrow();
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 4: Image Accessibility**
```typescript
// Feature: circular-gallery-projects, Property 4: Image accessibility
fc.assert(
  fc.property(
    fc.array(projectArbitrary, { minLength: 1, maxLength: 10 }),
    (projects) => {
      const { container } = render(<Projects projects={projects} />);
      
      // All images should have alt text
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        expect(img.getAttribute('alt')).toBeTruthy();
        expect(img.getAttribute('alt').length).toBeGreaterThan(0);
      });
    }
  ),
  { numRuns: 100 }
);
```

**Property Test 5: Color Contrast Compliance**
```typescript
// Feature: circular-gallery-projects, Property 5: Color contrast compliance
fc.assert(
  fc.property(
    fc.hexaColor(),  // Generate random hex colors
    (textColor) => {
      const backgroundColor = '#050505';
      const contrastRatio = calculateContrastRatio(textColor, backgroundColor);
      
      // If we use this color, it should meet WCAG AA standards
      if (contrastRatio >= 4.5) {
        expect(() => {
          render(
            <CircularGallery
              items={mockItems}
              textColor={textColor}
            />
          );
        }).not.toThrow();
      }
    }
  ),
  { numRuns: 100 }
);
```

### Arbitraries for Property Tests

```typescript
const projectArbitrary = fc.record({
  id: fc.string({ minLength: 1, maxLength: 10 }),
  title: fc.string({ minLength: 1, maxLength: 50 }),
  category: fc.string({ minLength: 1, maxLength: 30 }),
  date: fc.string({ minLength: 4, maxLength: 10 }),
  image: fc.constantFrom(
    '/assets/demon2.png',
    '/assets/romyhandsome.jpg',
    '/assets/1000482395-01.jpeg'
  ),
  url: fc.option(fc.webUrl(), { nil: undefined }),
  description: fc.option(fc.string({ maxLength: 200 }), { nil: undefined }),
});

const galleryItemArbitrary = fc.record({
  image: fc.constantFrom(
    '/assets/demon2.png',
    '/assets/romyhandsome.jpg',
    '/assets/1000482395-01.jpeg'
  ),
  text: fc.string({ minLength: 1, maxLength: 50 }),
  projectData: fc.option(projectArbitrary, { nil: undefined }),
});
```

### Integration Tests

Integration tests should verify the complete flow:

**Gallery Rendering Flow**:
1. Projects component mounts
2. Project data is transformed
3. CircularGallery receives correct props
4. Gallery renders with all items visible
5. WebGL canvas is created and rendering

**Click Interaction Flow**:
1. User clicks on a gallery item
2. Click handler is called with correct project data
3. If project has URL, window.open is called
4. If project has no URL, modal opens with project details

**Cleanup Flow**:
1. Projects component unmounts
2. CircularGallery cleanup is triggered
3. WebGL resources are disposed
4. Event listeners are removed
5. No memory leaks detected

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage of new/modified code
- **Property Tests**: All 5 correctness properties implemented
- **Integration Tests**: All major user flows covered
- **Manual Testing**: Visual verification on multiple devices and browsers

### Testing Tools

- **Unit Testing**: Jest + React Testing Library
- **Property Testing**: fast-check
- **Integration Testing**: Playwright or Cypress
- **Visual Testing**: Manual verification + screenshots
- **Accessibility Testing**: axe-core + manual screen reader testing
