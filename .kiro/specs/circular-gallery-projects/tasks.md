# Implementation Plan: Circular Gallery Projects Integration

## Overview

This implementation plan converts the Projects section from a GSAP ScrollTrigger-based vertical scrolling animation to a WebGL-powered 3D circular carousel using the existing CircularGallery component. The implementation focuses on data transformation, component integration, click interactions, and proper cleanup.

## Tasks

- [x] 1. Update Projects component to use CircularGallery
  - Remove GSAP and ScrollTrigger imports and logic
  - Remove refs (containerRef, imagesRef, textsRef) and animation code
  - Import CircularGallery component
  - Update section structure to render CircularGallery
  - _Requirements: 1.1, 1.3, 7.1_

- [ ] 2. Implement data transformation
  - [ ] 2.1 Create transformProjectsToGalleryItems function
    - Map project array to GalleryItem format
    - Preserve all project data in projectData field
    - Validate required fields (image, title)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ] 2.2 Write property test for data transformation
    - **Property 1: Data Transformation Completeness**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**
  
  - [ ] 2.3 Write unit tests for data transformation
    - Test with single project
    - Test with empty array
    - Test with missing optional fields
    - Test with invalid data (missing image/title)
    - _Requirements: 2.1, 2.2_

- [ ] 3. Configure gallery for dark theme
  - [ ] 3.1 Create gallery configuration object
    - Set bend value to 3
    - Set textColor to '#ffffff'
    - Set borderRadius to 0.05
    - Set font to 'bold 30px Figtree'
    - Set scrollSpeed to 2 and scrollEase to 0.05
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ] 3.2 Write property test for configuration validation
    - **Property 3: Configuration Value Validation**
    - **Validates: Requirements 3.1, 3.5**
  
  - [ ] 3.3 Write unit tests for configuration
    - Test gallery renders with default config
    - Test gallery renders with custom config
    - Test edge values (bend=0, bend=5)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4. Checkpoint - Ensure basic gallery renders
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Add click interaction support to CircularGallery
  - [ ] 5.1 Modify CircularGallery to accept onClick prop
    - Add onClick parameter to CircularGallery function
    - Pass onClick to App class constructor
    - Update App class to accept and store onClick callback
    - _Requirements: 5.1, 5.2_
  
  - [ ] 5.2 Implement click detection in Media class
    - Add isDragging flag and dragStartX tracking
    - Track mouse/touch movement distance
    - Add click handler that checks isDragging before calling onClick
    - Distinguish between click and drag (threshold: 5 pixels)
    - _Requirements: 5.3_
  
  - [ ] 5.3 Wire click events to Media meshes
    - Add raycasting or DOM overlay for click detection
    - Call handleClick when user clicks without dragging
    - Pass gallery item data and index to onClick callback
    - _Requirements: 5.1, 5.2_

- [ ] 6. Implement click handler in Projects component
  - [ ] 6.1 Create handleProjectClick function
    - Check if project has URL
    - If URL exists, open in new tab with window.open
    - If no URL, set selectedProject and open modal
    - _Requirements: 5.1, 5.2_
  
  - [ ] 6.2 Write unit tests for click handler
    - Test click with project that has URL
    - Test click with project without URL
    - Test handler receives correct project data
    - _Requirements: 5.1, 5.2_

- [ ] 7. Create ProjectModal component
  - [ ] 7.1 Implement modal structure
    - Create ProjectModal.tsx component
    - Add backdrop with click-to-close
    - Add close button
    - Display project image, title, category, date, description
    - Style with dark theme (bg-[#111], rounded corners)
    - _Requirements: 5.2_
  
  - [ ] 7.2 Add modal state management to Projects
    - Add selectedProject state
    - Add modalOpen state
    - Pass state and handlers to ProjectModal
    - _Requirements: 5.2_
  
  - [ ] 7.3 Write unit tests for modal
    - Test modal opens when project selected
    - Test modal closes on close button click
    - Test modal closes on backdrop click
    - Test modal displays correct project info
    - _Requirements: 5.2_

- [ ] 8. Checkpoint - Ensure click interactions work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Add accessibility features
  - [ ] 9.1 Add alt text to images
    - Ensure Image components have alt attributes
    - Use project title as alt text
    - _Requirements: 9.1_
  
  - [ ] 9.2 Add screen reader support
    - Ensure project titles are in DOM (not just WebGL)
    - Add aria-labels where appropriate
    - Add skip link for WebGL content
    - _Requirements: 9.2, 9.5_
  
  - [ ] 9.3 Write property test for image accessibility
    - **Property 4: Image Accessibility**
    - **Validates: Requirements 9.1**
  
  - [ ] 9.4 Write property test for color contrast
    - **Property 5: Color Contrast Compliance**
    - **Validates: Requirements 9.4**

- [ ] 10. Implement error handling
  - [ ] 10.1 Add image loading error handler
    - Add onError handler to Image components
    - Display placeholder on load failure
    - Log errors for debugging
    - _Requirements: 8.1_
  
  - [ ] 10.2 Add project data validation
    - Create validateProject function
    - Filter invalid projects before transformation
    - Warn about invalid data
    - Throw error if no valid projects
    - _Requirements: 2.1, 2.2_
  
  - [ ] 10.3 Write unit tests for error handling
    - Test image load failure
    - Test invalid project data
    - Test empty project array
    - _Requirements: 2.1, 8.1_

- [ ] 11. Verify cleanup and performance
  - [ ] 11.1 Verify WebGL cleanup
    - Ensure useEffect cleanup calls CircularGallery destroy
    - Verify event listeners are removed
    - Test component unmount during animation
    - _Requirements: 7.3, 7.4_
  
  - [ ] 11.2 Write unit tests for cleanup
    - Test cleanup function is called on unmount
    - Test destroy method removes event listeners
    - Test no memory leaks
    - _Requirements: 7.3, 7.4_

- [ ] 12. Final integration and testing
  - [ ] 12.1 Test complete user flow
    - Gallery renders with all projects
    - Click interactions work correctly
    - Modal opens and closes properly
    - Cleanup happens on unmount
    - _Requirements: 1.1, 1.2, 5.1, 5.2, 7.4_
  
  - [ ] 12.2 Write integration tests
    - Test gallery rendering flow
    - Test click interaction flow
    - Test cleanup flow
    - _Requirements: 1.1, 1.2, 5.1, 5.2, 7.4_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The CircularGallery component itself does not need modification except for adding onClick support
- Focus on integration, data transformation, and click interactions
