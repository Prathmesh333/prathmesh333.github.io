/**
 * Three.js Enhanced Particle Background
 * Premium neural-network inspired particle system with interactive elements
 * Features: Particles, connecting lines, floating geometric shapes, wave effects
 * RANDOMIZED: Different visual experience on each page load
 */

class ParticleBackground {
    constructor() {
        this.container = document.getElementById('three-canvas');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });

        // RANDOMIZATION: Different settings each time
        this.randomSeed = Math.random();
        this.colorScheme = this.getRandomColorScheme();
        this.particleCount = 600 + Math.floor(Math.random() * 400); // 600-1000 particles
        this.shapeCount = 3 + Math.floor(Math.random() * 5); // 3-7 shapes
        this.waveCount = 1 + Math.floor(Math.random() * 3); // 1-3 waves
        this.animationStyle = Math.floor(Math.random() * 3); // 0, 1, or 2
        
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.clock = new THREE.Clock();
        this.geometricShapes = [];
        this.waves = [];

        this.init();
        this.createParticles();
        this.createConnectingLines();
        this.createFloatingShapes();
        this.createWaveEffect();
        this.addEventListeners();
        this.animate();
    }

    getRandomColorScheme() {
        const schemes = [
            // Blue-Purple-Pink
            { colors: [0x4169e1, 0x9370db, 0xff69b4], name: 'purple' },
            // Orange-Red-Yellow
            { colors: [0xff6b35, 0xff0000, 0xffd700], name: 'fire' },
            // Green-Teal-Lime
            { colors: [0x00ff00, 0x00ced1, 0x7fff00], name: 'matrix' },
            // Pink-Blue-White
            { colors: [0xff1493, 0x1e90ff, 0xffffff], name: 'cotton' },
            // Gold-Orange-Red
            { colors: [0xffd700, 0xff8c00, 0xff4500], name: 'sunset' },
            // Deep Blue-Cyan-Purple
            { colors: [0x0080ff, 0x00ffff, 0x8000ff], name: 'ocean' },
            // Magenta-Lime-Cyan
            { colors: [0xff00ff, 0x00ff88, 0x00ffff], name: 'neon' }
        ];
        return schemes[Math.floor(Math.random() * schemes.length)];
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 30;
        
        console.log(`🎨 Background Theme: ${this.colorScheme.name.toUpperCase()}`);
        console.log(`✨ Particles: ${this.particleCount}`);
        console.log(`🔷 Shapes: ${this.shapeCount}`);
        console.log(`🌊 Waves: ${this.waveCount}`);
        
        // Apply theme colors IMMEDIATELY (no delay)
        this.applyThemeColors();
    }

    applyThemeColors() {
        const root = document.documentElement;
        
        // Convert hex colors properly
        const color1 = this.colorScheme.colors[0];
        const color2 = this.colorScheme.colors[1];
        const color3 = this.colorScheme.colors[2];
        
        const primaryColor = '#' + color1.toString(16).padStart(6, '0');
        const secondaryColor = '#' + color2.toString(16).padStart(6, '0');
        const accentColor = '#' + color3.toString(16).padStart(6, '0');
        
        // Update glow colors with opacity
        const primaryRGB = this.hexToRgb(primaryColor);
        const secondaryRGB = this.hexToRgb(secondaryColor);
        const accentRGB = this.hexToRgb(accentColor);
        
        const primaryGlow = `rgba(${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}, 0.15)`;
        const secondaryGlow = `rgba(${secondaryRGB.r}, ${secondaryRGB.g}, ${secondaryRGB.b}, 0.15)`;
        const accentGlow = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.15)`;
        
        // Method 1: Set properties directly on root element
        root.style.setProperty('--color-primary', primaryColor);
        root.style.setProperty('--color-secondary', secondaryColor);
        root.style.setProperty('--color-accent', accentColor);
        root.style.setProperty('--color-primary-glow', primaryGlow);
        root.style.setProperty('--color-secondary-glow', secondaryGlow);
        root.style.setProperty('--color-accent-glow', accentGlow);
        
        // Method 2: Also inject a high-priority style tag as backup
        const style = document.createElement('style');
        style.id = 'dynamic-theme-colors';
        style.textContent = `
            :root {
                --color-primary: ${primaryColor} !important;
                --color-secondary: ${secondaryColor} !important;
                --color-accent: ${accentColor} !important;
                --color-primary-glow: ${primaryGlow} !important;
                --color-secondary-glow: ${secondaryGlow} !important;
                --color-accent-glow: ${accentGlow} !important;
            }
            
            /* Force apply to specific elements */
            ::selection {
                background-color: ${primaryColor} !important;
            }
            ::-moz-selection {
                background-color: ${primaryColor} !important;
            }
            *:focus-visible {
                outline-color: ${primaryColor} !important;
            }
            ::-webkit-scrollbar-thumb {
                background: ${primaryColor} !important;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${accentColor} !important;
            }
            
            /* Override any hardcoded glow values */
            .section-number,
            .tag,
            .project-link,
            .contact-link:hover,
            .skill-category:hover,
            .stat-item:hover,
            .nav-toggle:hover {
                color: ${primaryColor} !important;
            }
            
            .resume-btn {
                border-color: ${primaryColor} !important;
                color: ${primaryColor} !important;
            }
            
            .resume-btn::before {
                background: ${primaryColor} !important;
            }
            
            .resume-btn:hover {
                box-shadow: 0 0 20px ${primaryGlow} !important;
            }
            
            .resume-btn-accent {
                background: ${primaryColor} !important;
                color: var(--color-bg) !important;
            }
            
            .resume-btn:hover .resume-btn-accent {
                background: var(--color-bg) !important;
                color: ${primaryColor} !important;
            }
            
            .nav-toggle {
                border-color: #666666 !important;
            }
            
            .nav-toggle:hover {
                border-color: ${primaryColor} !important;
                box-shadow: 0 0 20px ${primaryGlow} !important;
            }
            
            .project-card:hover {
                box-shadow: 0 20px 60px ${primaryGlow} !important;
            }
            
            .contact-card:hover {
                box-shadow: 0 20px 40px -15px ${primaryGlow} !important;
            }
            
            .skill-category:hover {
                box-shadow: 0 0 40px ${primaryGlow} !important;
            }
            
            .stat-item:hover {
                box-shadow: 0 0 30px ${primaryGlow} !important;
            }
            
            .contact-link:hover {
                box-shadow: 0 0 30px ${primaryGlow} !important;
            }
            
            /* Footer signature with theme colors */
            .footer-signature {
                background: linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${accentColor}, ${primaryColor}) !important;
                background-size: 200% auto !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                animation: gradientFlow 6s linear infinite !important;
                display: inline-block !important;
            }
            
            /* Nav logo with primary color */
            .nav-logo a {
                color: ${primaryColor} !important;
            }
            
            /* Hamburger menu with primary color */
            .hamburger,
            .hamburger::before,
            .hamburger::after {
                background: ${primaryColor} !important;
            }
            
            .nav-toggle.active .hamburger::before,
            .nav-toggle.active .hamburger::after {
                background: ${primaryColor} !important;
            }
        `;
        
        console.log(`🎨 Footer Signature Colors:`);
        console.log(`   Primary: ${primaryColor}`);
        console.log(`   Secondary: ${secondaryColor}`);
        console.log(`   Accent: ${accentColor}`);
        
        // Remove old dynamic style if exists
        const oldStyle = document.getElementById('dynamic-theme-colors');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // Append new style to head (at the end so it has highest priority)
        document.head.appendChild(style);
        
        console.log(`🎨 Applied Theme Colors:`);
        console.log(`   Primary: ${primaryColor} (RGB: ${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b})`);
        console.log(`   Primary Glow: ${primaryGlow}`);
        console.log(`   Secondary: ${secondaryColor} (RGB: ${secondaryRGB.r}, ${secondaryRGB.g}, ${secondaryRGB.b})`);
        console.log(`   Secondary Glow: ${secondaryGlow}`);
        console.log(`   Accent: ${accentColor} (RGB: ${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b})`);
        console.log(`   Accent Glow: ${accentGlow}`);
        
        // Verify the values were set
        setTimeout(() => {
            const computedPrimary = getComputedStyle(root).getPropertyValue('--color-primary').trim();
            const computedPrimaryGlow = getComputedStyle(root).getPropertyValue('--color-primary-glow').trim();
            console.log(`✅ Verified --color-primary: ${computedPrimary}`);
            console.log(`✅ Verified --color-primary-glow: ${computedPrimaryGlow}`);
        }, 200);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 255, b: 255 };
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        const velocities = new Float32Array(this.particleCount * 3);

        // Use random color scheme
        const color1 = new THREE.Color(this.colorScheme.colors[0]);
        const color2 = new THREE.Color(this.colorScheme.colors[1]);
        const color3 = new THREE.Color(this.colorScheme.colors[2]);

        // Random distribution patterns
        const distributionType = Math.floor(Math.random() * 3);

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            // Different distribution patterns
            if (distributionType === 0) {
                // Spherical distribution
                const radius = 30 + Math.random() * 20;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i3 + 2] = radius * Math.cos(phi);
            } else if (distributionType === 1) {
                // Cubic distribution
                positions[i3] = (Math.random() - 0.5) * 80;
                positions[i3 + 1] = (Math.random() - 0.5) * 60;
                positions[i3 + 2] = (Math.random() - 0.5) * 40;
            } else {
                // Cylindrical distribution
                const radius = Math.random() * 40;
                const angle = Math.random() * Math.PI * 2;
                positions[i3] = radius * Math.cos(angle);
                positions[i3 + 1] = (Math.random() - 0.5) * 60;
                positions[i3 + 2] = radius * Math.sin(angle);
            }

            // Random velocities
            const speed = 0.01 + Math.random() * 0.02;
            velocities[i3] = (Math.random() - 0.5) * speed;
            velocities[i3 + 1] = (Math.random() - 0.5) * speed;
            velocities[i3 + 2] = (Math.random() - 0.5) * speed;

            // Random color from scheme
            const colorChoice = Math.random();
            let color;
            if (colorChoice < 0.4) color = color1;
            else if (colorChoice < 0.7) color = color2;
            else color = color3;

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random size variation
            sizes[i] = Math.random() * 4 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float uTime;
                uniform float uPixelRatio;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    float animatedSize = size * (1.0 + sin(uTime * 2.0 + position.x) * 0.3);
                    
                    gl_PointSize = animatedSize * uPixelRatio * (20.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distance = length(gl_PointCoord - vec2(0.5));
                    if (distance > 0.5) discard;
                    
                    float strength = 1.0 - (distance * 2.0);
                    strength = pow(strength, 1.5);
                    
                    gl_FragColor = vec4(vColor, strength * 0.8);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createConnectingLines() {
        const lineGeometry = new THREE.BufferGeometry();
        const maxConnections = 100 + Math.floor(Math.random() * 100); // 100-200 lines
        const linePositions = new Float32Array(maxConnections * 6);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

        // Random line color from scheme
        const lineColor = this.colorScheme.colors[Math.floor(Math.random() * 3)];
        const lineOpacity = 0.1 + Math.random() * 0.1; // 0.1-0.2

        const lineMaterial = new THREE.LineBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: lineOpacity,
            blending: THREE.AdditiveBlending
        });

        this.lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.lines);
    }

    createFloatingShapes() {
        const allShapes = [
            { geometry: new THREE.TorusGeometry(2, 0.5, 16, 50), name: 'torus' },
            { geometry: new THREE.OctahedronGeometry(1.5), name: 'octahedron' },
            { geometry: new THREE.TetrahedronGeometry(2), name: 'tetrahedron' },
            { geometry: new THREE.IcosahedronGeometry(1.8), name: 'icosahedron' },
            { geometry: new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16), name: 'torusKnot' },
            { geometry: new THREE.DodecahedronGeometry(1.7), name: 'dodecahedron' },
            { geometry: new THREE.ConeGeometry(1.5, 3, 8), name: 'cone' },
            { geometry: new THREE.CylinderGeometry(1, 1, 3, 8), name: 'cylinder' }
        ];

        // Randomly select shapes
        const shuffled = allShapes.sort(() => Math.random() - 0.5);
        const selectedShapes = shuffled.slice(0, this.shapeCount);

        selectedShapes.forEach((shapeData, index) => {
            const colorIndex = Math.floor(Math.random() * 3);
            const material = new THREE.MeshBasicMaterial({
                color: this.colorScheme.colors[colorIndex],
                wireframe: true,
                transparent: true,
                opacity: 0.1 + Math.random() * 0.1,
                blending: THREE.AdditiveBlending
            });

            const mesh = new THREE.Mesh(shapeData.geometry, material);
            
            // Random positioning
            const angle = (index / this.shapeCount) * Math.PI * 2 + Math.random() * 0.5;
            const radius = 20 + Math.random() * 15;
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.y = Math.sin(angle) * radius * 0.6;
            mesh.position.z = -15 + (Math.random() - 0.5) * 20;
            
            // Random rotation speeds
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };
            
            // Random scale
            const scale = 0.7 + Math.random() * 0.6;
            mesh.scale.set(scale, scale, scale);

            this.geometricShapes.push(mesh);
            this.scene.add(mesh);
        });
    }

    createWaveEffect() {
        for (let w = 0; w < this.waveCount; w++) {
            const waveGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
            const positions = waveGeometry.attributes.position.array;
            
            const originalPositions = new Float32Array(positions.length);
            for (let i = 0; i < positions.length; i++) {
                originalPositions[i] = positions[i];
            }

            const colorIndex = w % 3;
            const waveMaterial = new THREE.MeshBasicMaterial({
                color: this.colorScheme.colors[colorIndex],
                wireframe: true,
                transparent: true,
                opacity: 0.05 + Math.random() * 0.05,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide
            });

            const wave = new THREE.Mesh(waveGeometry, waveMaterial);
            
            // Random wave positioning and rotation
            wave.rotation.x = (Math.random() - 0.5) * Math.PI / 2;
            wave.rotation.y = (Math.random() - 0.5) * Math.PI / 4;
            wave.position.z = -20 - (w * 10) - Math.random() * 10;
            wave.position.y = (Math.random() - 0.5) * 20;
            
            wave.userData.originalPositions = originalPositions;
            wave.userData.waveSpeed = 0.5 + Math.random() * 1;
            wave.userData.waveAmplitude = 1 + Math.random() * 2;
            
            this.waves.push(wave);
            this.scene.add(wave);
        }
    }

    updateConnectingLines() {
        if (!this.particles || !this.lines) return;

        const positions = this.particles.geometry.attributes.position.array;
        const linePositions = this.lines.geometry.attributes.position.array;
        const maxDistance = 6 + Math.random() * 4;
        let lineIndex = 0;

        for (let i = 0; i < this.particleCount && lineIndex < linePositions.length; i += 3) {
            for (let j = i + 3; j < this.particleCount && lineIndex < linePositions.length; j += 3) {
                const dx = positions[i] - positions[j];
                const dy = positions[i + 1] - positions[j + 1];
                const dz = positions[i + 2] - positions[j + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < maxDistance) {
                    linePositions[lineIndex++] = positions[i];
                    linePositions[lineIndex++] = positions[i + 1];
                    linePositions[lineIndex++] = positions[i + 2];
                    linePositions[lineIndex++] = positions[j];
                    linePositions[lineIndex++] = positions[j + 1];
                    linePositions[lineIndex++] = positions[j + 2];
                }
            }
        }

        this.lines.geometry.attributes.position.needsUpdate = true;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('click', (e) => this.onMouseClick(e));
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onMouseClick(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                const dx = positions[i3] / 40 - mouseX;
                const dy = positions[i3 + 1] / 30 - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 0.3) {
                    positions[i3] += dx * 2;
                    positions[i3 + 1] += dy * 2;
                }
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();

        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        if (this.particles) {
            // Different animation styles
            if (this.animationStyle === 0) {
                this.particles.rotation.y = this.mouse.x * 0.3 + elapsedTime * 0.1;
                this.particles.rotation.x = this.mouse.y * 0.2;
            } else if (this.animationStyle === 1) {
                this.particles.rotation.y = Math.sin(elapsedTime * 0.5) * 0.5;
                this.particles.rotation.x = Math.cos(elapsedTime * 0.3) * 0.3;
            } else {
                this.particles.rotation.y = this.mouse.x * 0.5;
                this.particles.rotation.x = this.mouse.y * 0.4;
                this.particles.rotation.z = elapsedTime * 0.05;
            }

            this.particles.material.uniforms.uTime.value = elapsedTime;

            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.geometry.attributes.velocity.array;
            
            for (let i = 0; i < this.particleCount; i++) {
                const i3 = i * 3;
                
                positions[i3] += velocities[i3];
                positions[i3 + 1] += velocities[i3 + 1] + Math.sin(elapsedTime + positions[i3]) * 0.01;
                positions[i3 + 2] += velocities[i3 + 2];
                
                if (Math.abs(positions[i3]) > 40) velocities[i3] *= -1;
                if (Math.abs(positions[i3 + 1]) > 30) velocities[i3 + 1] *= -1;
                if (Math.abs(positions[i3 + 2]) > 20) velocities[i3 + 2] *= -1;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        this.geometricShapes.forEach((shape, index) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01;
            shape.material.opacity = 0.1 + Math.sin(elapsedTime + index) * 0.05;
        });

        this.waves.forEach((wave) => {
            const positions = wave.geometry.attributes.position.array;
            const originalPositions = wave.userData.originalPositions;
            const speed = wave.userData.waveSpeed;
            const amplitude = wave.userData.waveAmplitude;
            
            for (let i = 0; i < positions.length; i += 3) {
                const x = originalPositions[i];
                const y = originalPositions[i + 1];
                
                positions[i + 2] = originalPositions[i + 2] + 
                    Math.sin(x * 0.1 + elapsedTime * speed) * amplitude +
                    Math.cos(y * 0.1 + elapsedTime * speed) * amplitude;
            }
            
            wave.geometry.attributes.position.needsUpdate = true;
            wave.rotation.z = elapsedTime * 0.05 * speed;
        });

        if (Math.floor(elapsedTime * 10) % 2 === 0) {
            this.updateConnectingLines();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new ParticleBackground();
    }
});
