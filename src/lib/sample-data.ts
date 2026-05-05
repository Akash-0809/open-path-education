export const coursesData = {
  "courses": [
    {
      "id": "course-vi-001",
      "title": "Audio Storytelling Fundamentals",
      "description": "Master the art of creating engaging audio narratives. Learn audio production techniques, voice modulation, and storytelling principles designed with extensive audio descriptions and accessibility features.",
      "category": "creative",
      "instructor": "Sarah Mitchell",
      "level": "beginner",
      "duration": 240,
      "thumbnail": "https://images.unsplash.com/photo-1505373877505-f32726481fd3?w=400&h=225&fit=crop",
      "rating": 4.8,
      "students": 524,
      "accessibility": {
        "for": "visually_impaired",
        "features": [
          "Full audio descriptions of all visual content",
          "High-quality audio narration throughout",
          "Detailed text transcripts for all lessons",
          "Screen reader optimized materials",
          "Audio-based navigation"
        ]
      },
      "lessons": [
        {
          "id": "lesson-vi-001-01",
          "order": 1,
          "title": "Introduction to Audio Storytelling",
          "description": "Explore the fundamentals of audio storytelling including voice techniques, pacing, and emotional storytelling.",
          "duration": 45,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "In this lesson, we'll explore the fundamentals of audio storytelling. Audio storytelling is a powerful medium that relies entirely on sound to create vivid mental images. We'll discuss voice techniques including pitch, tone, and pacing. You'll learn how to use silence and sound effects to build tension and create emotional connections with your audience.",
          "transcript": "Welcome to audio storytelling fundamentals. Today we're going to dive into the core concepts that make audio narratives engaging and immersive. The three main pillars of audio storytelling are voice performance, sound design, and narrative structure. Your voice is your primary tool, and understanding how to modulate it effectively is crucial. Pacing - the speed at which you deliver your story - determines whether your audience remains engaged or loses interest. Silence is just as important as sound. Strategic pauses create anticipation and allow listeners to absorb information.",
          "resources": [
            {
              "type": "text",
              "title": "Audio Storytelling Guide",
              "url": "https://example.com/resources/audio-guide"
            },
            {
              "type": "audio",
              "title": "Voice Technique Examples",
              "url": "https://example.com/audio/voice-examples"
            }
          ]
        },
        {
          "id": "lesson-vi-001-02",
          "order": 2,
          "title": "Voice Performance Techniques",
          "description": "Deep dive into voice modulation, character voices, and emotional expression through audio.",
          "duration": 50,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "In this session, we explore voice performance techniques. Learn to create distinct character voices, modulate your tone for emotional impact, and develop a signature narration style.",
          "transcript": "Voice performance is the art of using your vocal instrument to convey emotion, character, and narrative intent. There are several key techniques to master: Character differentiation - each character should have a distinct vocal signature. This could be achieved through pitch, accent, speech patterns, or combination of these. Dynamic range refers to varying your volume, pitch, and tone to maintain listener engagement. Never read in a monotone. Express emotion authentically. Your audience will sense inauthenticity. Practice breathing correctly to support your voice through long passages. Proper breathing technique prevents fatigue and maintains vocal quality.",
          "resources": [
            {
              "type": "audio",
              "title": "Character Voice Examples",
              "url": "https://example.com/audio/character-voices"
            },
            {
              "type": "text",
              "title": "Voice Exercise Guide",
              "url": "https://example.com/resources/voice-exercises"
            }
          ]
        },
        {
          "id": "lesson-vi-001-03",
          "order": 3,
          "title": "Sound Design and Production",
          "description": "Learn to layer audio elements to create immersive soundscapes and professional-quality audio productions.",
          "duration": 55,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "Sound design principles for creating immersive audio environments. Learn about ambient sound, sound effects, and music to enhance your audio narratives.",
          "transcript": "Sound design is the practice of creating and manipulating audio elements to support your narrative. A professional audio story includes multiple layers: the primary narrator, ambient background sounds, sound effects for specific actions or transitions, and musical underscore. Ambient sound provides context. In a scene set in a forest, subtle sounds of wind through trees, bird calls, and rustling leaves create place. Sound effects emphasize story moments. A door creaking, footsteps approaching, or glass breaking draws listener attention and marks transitions. Music sets emotional tone. Instrumental music underneath dialogue can amplify emotion. Music should support, not overwhelm, your narrative. Balance is key. The combined volume of all elements should create a cohesive whole where each layer serves the story."
        }
      ]
    },
    {
      "id": "course-vi-002",
      "title": "Web Accessibility Development",
      "description": "Comprehensive course on building fully accessible web applications. Learn WCAG standards, semantic HTML, ARIA attributes, and accessibility testing with full audio descriptions and keyboard navigation guides.",
      "category": "technology",
      "instructor": "Marcus Johnson",
      "level": "intermediate",
      "duration": 360,
      "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop",
      "rating": 4.9,
      "students": 892,
      "accessibility": {
        "for": "visually_impaired",
        "features": [
          "Complete audio walkthrough of code examples",
          "Screen reader testing methods explained",
          "Detailed keyboard navigation guides",
          "Full text descriptions of diagrams and charts",
          "Code snippets with extensive comments"
        ]
      },
      "lessons": [
        {
          "id": "lesson-vi-002-01",
          "order": 1,
          "title": "WCAG 2.1 Standards and Principles",
          "description": "Understanding the Web Content Accessibility Guidelines and how to apply them.",
          "duration": 60,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "WCAG 2.1 defines accessibility standards based on four principles: Perceivable, Operable, Understandable, and Robust. Learn how to implement these principles in your web projects.",
          "transcript": "The Web Content Accessibility Guidelines version 2.1 are the gold standard for web accessibility. These guidelines are built on four fundamental principles, remembered by the acronym POUR. Perceivable: Users must be able to perceive the information being presented. This means providing text alternatives for images, captions for videos, and sufficient color contrast. Operable: Users must be able to navigate and interact with the site. This includes keyboard accessibility, sufficient time to read content, and avoiding content that causes seizures. Understandable: Users must understand the content and how to use the interface. This includes clear language, predictable navigation, and helpful error messages. Robust: Content must work with current and future assistive technologies. This requires valid HTML and proper ARIA usage."
        },
        {
          "id": "lesson-vi-002-02",
          "order": 2,
          "title": "Semantic HTML and ARIA",
          "description": "Learn to write semantic HTML and implement ARIA attributes correctly.",
          "duration": 70,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "Semantic HTML and ARIA attributes are crucial for accessibility. Discover best practices for using these technologies.",
          "transcript": "Semantic HTML provides meaning to web content. Instead of using generic div and span elements, we use semantic elements like nav, main, article, and section. These elements communicate the purpose of content to assistive technologies. ARIA, which stands for Accessible Rich Internet Applications, provides additional information when HTML semantics aren't sufficient. ARIA attributes include roles, states, and properties. A role defines what an element is, like button or navigation. State describes the current condition, like aria-pressed or aria-expanded. Property provides additional information, like aria-label or aria-describedby. When implementing ARIA, remember: always use native HTML elements when available. ARIA is a supplement, not a replacement. Test with actual assistive technologies."
        },
        {
          "id": "lesson-vi-002-03",
          "order": 3,
          "title": "Testing Accessibility",
          "description": "Methods and tools for testing web accessibility with screen readers and keyboard navigation.",
          "duration": 65,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "Practical accessibility testing using screen readers, keyboard navigation, and automated tools.",
          "transcript": "Accessibility testing involves multiple approaches. First, keyboard testing: navigate your entire site using only the Tab key, Enter, and arrow keys. All functionality should be accessible. Screen reader testing: use free tools like NVDA on Windows or VoiceOver on Mac to experience your site as blind users do. Pay attention to what the screen reader announces. Automated testing: tools like axe and WAVE catch many issues, but they can't catch everything. Manual testing is essential. User testing: involve people with disabilities in your testing process. Real users will find issues that tools miss. Document all issues and prioritize fixes based on impact and difficulty."
        }
      ]
    },
    {
      "id": "course-vi-003",
      "title": "Piano by Ear: Audio Learning Method",
      "description": "Learn to play piano using purely auditory methods. This course uses extensive sound demonstrations, interval training, and ear development techniques perfect for visually impaired musicians.",
      "category": "creative",
      "instructor": "Elena Rodriguez",
      "level": "beginner",
      "duration": 420,
      "thumbnail": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=225&fit=crop",
      "rating": 4.7,
      "students": 356,
      "accessibility": {
        "for": "visually_impaired",
        "features": [
          "Audio demonstrations of all techniques",
          "Interval identification exercises",
          "Chord identification by ear",
          "Note reading alternatives",
          "Tactile guide references for key positions"
        ]
      },
      "lessons": [
        {
          "id": "lesson-vi-003-01",
          "order": 1,
          "title": "Ear Training Fundamentals",
          "description": "Develop your musical ear through guided listening exercises.",
          "duration": 50,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "Train your ear to recognize musical intervals, pitches, and chords through systematic listening exercises.",
          "transcript": "Ear training is the foundation of learning music by ear. We'll start with intervals - the distance between two pitches. There are twelve intervals in Western music. Each has a unique sound quality. A major third sounds bright and happy. A minor third sounds darker. A perfect fifth is stable and consonant. A tritone is tense and dissonant. We'll practice these systematically. You'll hear two notes played together, then separately, then together again. Your job is to identify the interval. With practice, you'll develop intuitive recognition. Next, we'll work on individual pitches. In absolute pitch training, you learn to identify notes by name. Relative pitch is more practical - identifying intervals from a reference note. We'll focus on relative pitch in this course."
        },
        {
          "id": "lesson-vi-003-02",
          "order": 2,
          "title": "Basic Chord Identification",
          "description": "Learn to recognize and distinguish between major, minor, and dominant chords.",
          "duration": 55,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "Understand chord construction and learn to identify chords purely by their sound.",
          "transcript": "Chords are combinations of three or more notes played together. A major chord consists of three notes: a root note, a major third above it, and a perfect fifth above the root. The major chord has a happy, bright quality. A minor chord uses a minor third, giving it a sad, introspective quality. The root and fifth remain the same. A dominant seventh chord adds a minor seventh to the major triad, creating tension that wants to resolve. When you hear these chords, you should immediately recognize them by their emotional quality. Major chords sound resolved and stable. Minor chords sound introspective. Dominant sevenths sound unresolved and tense. We'll practice hearing these progressions in context."
        },
        {
          "id": "lesson-vi-003-03",
          "order": 3,
          "title": "Playing by Ear - Your First Song",
          "description": "Apply your skills by learning a simple song entirely by ear.",
          "duration": 60,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "Combine interval and chord knowledge to learn and play a complete song by ear.",
          "transcript": "Now we'll put everything together and learn a song entirely by ear. We're starting with a simple folk melody. Listen to the song several times. Pay attention to the contour - does the melody go up or down? Notice the jumps and steps. A step is a small interval, usually a second. A jump is larger. Now, let's work phrase by phrase. The melody begins on G. The next note goes up a step to A. Then up another step to B. These are seconds - small intervals. The fourth note is a larger jump to D. That's a third. Continue this process, slowly building up the entire melody. Once you have the melody, we'll add the chords underneath. Listen for the harmonic movement. When does the harmony change? What chords support this melody? With practice, you'll develop the ability to hear exactly what notes and chords you want to play."
        }
      ]
    },
    {
      "id": "course-hi-001",
      "title": "Visual Communication and Sign Language Basics",
      "description": "Comprehensive introduction to American Sign Language (ASL) and visual communication techniques. Highly visual course with detailed captioning and on-screen sign language demonstrations.",
      "category": "life-skills",
      "instructor": "James Patterson",
      "level": "beginner",
      "duration": 300,
      "thumbnail": "https://images.unsplash.com/photo-1516321318423-f06f70a504f6?w=400&h=225&fit=crop",
      "rating": 4.9,
      "students": 1205,
      "accessibility": {
        "for": "hearing_impaired",
        "features": [
          "On-screen ASL interpretation throughout",
          "Full captions for all dialog and narration",
          "Clear video of sign demonstrations",
          "Written explanations of all concepts",
          "Slow-motion sign demonstrations",
          "Fingerspelling guide with visuals"
        ]
      },
      "lessons": [
        {
          "id": "lesson-hi-001-01",
          "order": 1,
          "title": "Introduction to ASL",
          "description": "Learn the basics of American Sign Language including hand shapes, positions, and movements.",
          "duration": 50,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[INTRO MUSIC] Sign Instructor: Welcome to American Sign Language! Today we'll explore the fundamentals. ASL is a complete language with its own grammar and structure. [SIGNS IN ASL] ASL uses hand shapes, positions, movements, and facial expressions to convey meaning. There are 19 basic hand shapes. [DEMONSTRATES EACH] The position of your hands in space matters. High, middle, and low positions convey different meanings. Movement is crucial - the same hand shape moving differently creates different signs. Facial expressions add emotion and grammatical information.",
          "transcript": "American Sign Language, or ASL, is the visual language used by Deaf communities in the United States and Canada. ASL is not English - it has different grammar, syntax, and cultural expressions. Learning ASL requires understanding five key components: hand shape, hand position, hand movement, palm orientation, and non-manual signals. Non-manual signals include facial expressions, head movement, and body positioning. These elements work together to create meaning. For example, the sign for 'give' uses an open hand shape, positioned in front of you, moving away from your body with palm up. If you change the hand shape, position, or movement, you create different signs. If you add specific facial expressions, you can change the meaning or emphasis. We'll practice each component systematically."
        },
        {
          "id": "lesson-hi-001-02",
          "order": 2,
          "title": "Fingerspelling and Names",
          "description": "Master the fingerspelling alphabet and learn how to spell names and words.",
          "duration": 45,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[DEMONSTRATES FULL ASL ALPHABET SLOWLY] Sign Instructor: [FINGERSPELLS: A-B-C-D-E] Each letter has a unique hand shape. A is a closed fist. B is an open hand with fingers together. C is a curved hand. [CONTINUES DEMONSTRATING] Watch my hand shape, position, and orientation carefully. Practice each letter. [FINGERSPELLS: HELLO] We're spelling the word 'hello'. Each letter flows into the next.",
          "transcript": "Fingerspelling is the visual representation of the English alphabet using hand shapes. Each letter A through Z has a specific hand shape. Fingerspelling is used for names, acronyms, and words without established signs. When fingerspelling, maintain consistent hand position, move smoothly between letters, and maintain even rhythm. Don't go too fast - clarity matters. Practice the alphabet until it becomes automatic. Then practice spelling your name. When someone introduces themselves through fingerspelling, watch carefully and ask them to repeat if needed. Important names often have ASL signs that have been established within the community. Ask Deaf people what their preferred sign name is rather than spelling their English name repeatedly."
        },
        {
          "id": "lesson-hi-001-03",
          "order": 3,
          "title": "Essential Conversation Phrases",
          "description": "Learn 50 essential signs for everyday conversations.",
          "duration": 55,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[Sign Instructor demonstrates conversational signs with clear visuals] 'Hello' [SIGNS] 'How are you?' [SIGNS] 'Nice to meet you' [SIGNS] 'Thank you' [SIGNS] 'You're welcome' [SIGNS] 'Excuse me' [SIGNS] 'I don't understand' [SIGNS]",
          "transcript": "Now let's learn essential conversation phrases. Hello is signed with an open hand touching your forehead, then moving outward. How are you involves pointing to the other person with both index fingers, then making a questioning facial expression. Nice to meet you combines the sign for 'nice', then brings both hands together. Thank you involves an open hand at your mouth, moving outward toward the person. Please involves a circular motion on your chest with an open hand. Excuse me touches the other person gently and waves your hand to get attention. I don't understand shrugs shoulders and shows confusion with facial expression. What is your name? Points to the person, then fingerspells 'name' or uses the specific sign name established for that person. Where are you from? Points outward and uses the location sign. These phrases form the foundation of ASL conversations. Practice with fluent signers whenever possible."
        }
      ]
    },
    {
      "id": "course-hi-002",
      "title": "Visual Design Principles for Clarity",
      "description": "Master visual design techniques specifically focused on creating clear, understandable visual communication. Perfect for hearing-impaired learners who rely on visual cues and design clarity.",
      "category": "creative",
      "instructor": "Sophie Chen",
      "level": "intermediate",
      "duration": 330,
      "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      "rating": 4.8,
      "students": 678,
      "accessibility": {
        "for": "hearing_impaired",
        "features": [
          "Full captions for all instructions",
          "Clear visual demonstrations",
          "On-screen design examples with annotations",
          "Color contrast verification demonstrations",
          "Typography clarity guidelines with examples",
          "Real-time visual design corrections"
        ]
      },
      "lessons": [
        {
          "id": "lesson-hi-002-01",
          "order": 1,
          "title": "Color Theory and Accessibility",
          "description": "Understanding color combinations and contrast for maximum clarity and accessibility.",
          "duration": 60,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[SHOWS COLOR WHEEL] Designer: Color theory is fundamental to visual communication. [DEMONSTRATES LOW CONTRAST TEXT] This red text on pink background is hard to read. [SWITCHES TO HIGH CONTRAST] This black text on white background is much clearer. Color matters for everyone, but especially for people with color blindness or low vision. [SHOWS VARIOUS COLOR COMBINATIONS] These combinations work well for accessibility.",
          "transcript": "Color theory involves understanding how colors interact. The color wheel shows primary, secondary, and tertiary colors. Understanding color relationships helps create harmonious and accessible designs. Contrast is critical for accessibility. Text must have sufficient contrast against its background. The WCAG standard requires a 4.5 to 1 contrast ratio for normal text, and 3 to 1 for large text. Always test your color combinations. Avoid red-green combinations, as they're problematic for people with red-green color blindness. Instead, use blue-orange or blue-yellow combinations. White or light gray backgrounds with dark text provide maximum contrast and clarity. When choosing a color palette, test it with color blindness simulators to ensure it works for everyone. Use color as one communication tool, but never rely solely on color to convey information. Always add another visual indicator, like pattern or text."
        },
        {
          "id": "lesson-hi-002-02",
          "order": 2,
          "title": "Typography for Readability",
          "description": "Learn typeface selection and formatting techniques that maximize readability.",
          "duration": 55,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[SHOWS VARIOUS TYPEFACES] Designer: Typography affects how easily we read text. [DEMONSTRATES SANS-SERIF FONTS] Sans-serif fonts like Arial and Helvetica are clear and modern. [SHOWS SERIF FONTS] Serif fonts like Times New Roman add elegance. For digital clarity, sans-serif works better.",
          "transcript": "Typography is the art of arranging type. Choosing the right typeface is crucial for accessibility. Sans-serif typefaces like Arial, Helvetica, and Verdana work best for digital content. They're clean and easy to read. Serif typefaces add horizontal lines to letter ends, which can sometimes reduce clarity on screens. Font size matters - use at least 12pt for body text. For headings, use 18pt or larger. Line height (spacing between lines) should be 1.5 times the font size for optimal readability. Avoid very large blocks of text. Break content into manageable chunks. Use formatting like bold and italics sparingly for emphasis. ALL CAPS TEXT IS HARDER TO READ - avoid it. Justified text alignment creates uneven spacing that's harder to read - use left alignment instead. Letter spacing and word spacing should be consistent and adequate. These simple principles dramatically improve readability for everyone."
        },
        {
          "id": "lesson-hi-002-03",
          "order": 3,
          "title": "Layout and Information Hierarchy",
          "description": "Organizing information visually so that the most important information stands out clearly.",
          "duration": 60,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[SHOWS CLUTTERED LAYOUT] Designer: This layout is overwhelming. Too much information competing for attention. [SHOWS ORGANIZED LAYOUT] This version uses clear hierarchy. Most important information is prominent.",
          "transcript": "Information hierarchy determines what viewers notice first. Use size to indicate importance - larger text draws attention. Use color to highlight key information. Use white space strategically - don't clutter the entire page. Use alignment and grouping to organize related information. Organize content in scannable chunks. Use headings and subheadings to guide viewers through content. Use bullet points for lists rather than dense paragraphs. Position the most important information at the top and in the center. Use visual weight strategically - darker colors and larger shapes feel heavier and more important. Create visual flow - guide the viewer's eye through the design in a logical progression. Balance consistency with variety - too much sameness is boring, too much variety is chaotic. Follow the grid system to maintain alignment and consistency. Test your layouts with real users to ensure they understand your intended hierarchy."
        }
      ]
    },
    {
      "id": "course-hi-003",
      "title": "Digital Literacy and Accessible Technology",
      "description": "Comprehensive guide to using digital tools and technology with captions, visual tutorials, and accessible interface design. Designed specifically for hearing-impaired users to master digital communication.",
      "category": "technology",
      "instructor": "David Kumar",
      "level": "beginner",
      "duration": 360,
      "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop",
      "rating": 4.7,
      "students": 934,
      "accessibility": {
        "for": "hearing_impaired",
        "features": [
          "Complete captions on all video tutorials",
          "On-screen text of all spoken instructions",
          "Visual step-by-step guides",
          "Written transcripts for all lessons",
          "Color-coded interface elements",
          "Clear visual indicators replacing sound notifications"
        ]
      },
      "lessons": [
        {
          "id": "lesson-hi-003-01",
          "order": 1,
          "title": "Essential Digital Tools and Applications",
          "description": "Learn to navigate essential digital tools with clear visual guides and accessibility features.",
          "duration": 70,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[SCREEN RECORDING] Instructor: Today we'll explore essential digital tools. [SHOWS BROWSER] This is a web browser - your gateway to online information. [DEMONSTRATES CLICKING, TYPING, NAVIGATING] To open a website, click the address bar and type the web address. [SHOWS BROWSER FUNCTIONS] The back button returns to previous pages. The refresh button reloads the page.",
          "transcript": "A web browser is your primary tool for accessing online information. Common browsers include Chrome, Firefox, Edge, and Safari. All work similarly. The address bar at the top displays the current website address. Type an address here to visit a website. The search bar searches the internet using your chosen search engine. Google is the most common. The home button returns you to your home page. The back and forward buttons navigate through your browsing history. Bookmarks save your favorite websites for quick access. The settings menu contains preferences and additional options. Email is essential for digital communication. Providers like Gmail, Outlook, and Yahoo offer free email. Email allows you to send and receive messages, attach files, and organize conversations. Cloud storage services like Google Drive, OneDrive, and Dropbox let you store and share files online. This is essential for accessing documents from multiple devices and collaborating with others."
        },
        {
          "id": "lesson-hi-003-02",
          "order": 2,
          "title": "Communication Accessibility Online",
          "description": "Master accessible communication methods including email, text, video conferencing with captions.",
          "duration": 65,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[SHOWS EMAIL INTERFACE] Instructor: Email is your primary written communication tool. [DEMONSTRATES COMPOSING EMAIL] Click the compose button to create a new message. [TYPES EXAMPLE] Enter the recipient's email address, subject line, and message. [SHOWS SEND BUTTON] Click send to transmit the message.",
          "transcript": "Email is the most common digital communication tool. To send an email, you need the recipient's email address. Write a clear subject line that describes your message. In the body, write your message clearly and professionally. Use proper paragraphing to make your email easy to read. You can attach files by clicking the attachment button. Click send to transmit. Text messaging is faster than email. Most messaging platforms include notification systems. Video conferencing platforms like Zoom and Google Meet now offer built-in captioning. Enable captions before or during the meeting. Position your camera at eye level and ensure good lighting so others can see your face clearly for non-verbal communication. Video relay services connect you with an interpreter who relays conversations between you and hearing people. Use these services for phone calls and important conversations. Email remains the most reliable for important written communication."
        },
        {
          "id": "lesson-hi-003-03",
          "order": 3,
          "title": "Social Media and Online Safety",
          "description": "Navigate social media platforms safely and effectively while maintaining privacy and security.",
          "duration": 60,
          "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "captions": "[SHOWS SOCIAL MEDIA PLATFORMS] Instructor: Social media connects you with communities. [DEMONSTRATES ACCOUNT SETUP] Create an account with a username and strong password. [SHOWS PROFILE] Customize your profile with photos and information.",
          "transcript": "Social media platforms like Facebook, Twitter, Instagram, and LinkedIn connect people and communities. Each platform has different purposes. Facebook is for sharing life updates and maintaining friendships. Twitter focuses on news and current events. Instagram emphasizes visual content like photos and videos. LinkedIn is for professional networking. Creating a strong password is essential for security. Use at least 12 characters combining upper and lowercase letters, numbers, and symbols. Never share your password. Enable two-factor authentication for additional security. Be careful what information you share publicly. Scammers seek personal information to commit fraud. Never share your Social Security number, financial information, or passwords. Be skeptical of messages from strangers requesting money or information. Privacy settings control who sees your information. Review and adjust privacy settings regularly. Cyberbullying is harassment online. If you experience cyberbullying, block the person and report them to the platform. Protect your digital identity - you have the right to feel safe online."
        }
      ]
    }
  ]
}
;