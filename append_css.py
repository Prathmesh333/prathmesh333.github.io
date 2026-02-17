
/* ========================================
   ENHANCED CONTACT SECTION
   ======================================== */

.contact-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.contact-text h3 {
    font-family: var(--font-primary);
    font-size: clamp(2rem, 5vw, 3rem);
    background: linear-gradient(135deg, var(--color-text), var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: var(--spacing-md);
}

.contact-text p {
    font-size: 1.2rem;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.contact-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
}

.contact-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-light);
    border: 1px solid var(--color-bg-lighter);
    border-radius: 12px;
    transition: all var(--transition-normal);
    text-decoration: none;
    position: relative;
    overflow: hidden;
}

.contact-item:hover {
    border-color: var(--color-primary);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -10px var(--color-primary-glow);
    background: var(--color-bg-lighter);
}

/* Glassmorphism effect on hover */
.contact-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    transition: 0.5s;
}

.contact-item:hover::before {
    left: 100%;
}

.contact-item .icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    transition: all var(--transition-fast);
    flex-shrink: 0;
}

.contact-item:hover .icon {
    background: var(--color-primary);
    color: var(--color-bg);
    transform: scale(1.1) rotate(10deg);
}

.contact-item a {
    color: var(--color-text);
    text-decoration: none;
    font-family: var(--font-primary);
    font-weight: 500;
    font-size: 1.1rem;
    transition: color var(--transition-fast);
    z-index: 1;
}

.contact-item:hover a {
    color: var(--color-primary);
}

/* Make email font slightly smaller if needed to fit */
.contact-item a[href^="mailto"] {
    font-size: 0.95rem;
    word-break: break-all;
}
