/**
 * Google Maps API Loader Manager
 * Ensures API is loaded only once, preventing duplicate loading errors
 */

interface GoogleMapsLoaderOptions {
  apiKey?: string;
  libraries?: string[];
}

class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private isLoading = false;
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;
  private callbacks: (() => void)[] = [];

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  /**
   * Load Google Maps API
   * @param options Loading options
   * @returns Promise that resolves when API is loaded
   */
  public load(options: GoogleMapsLoaderOptions = {}): Promise<void> {
    // If already loaded, return resolved promise directly
    if (this.isLoaded && window.google?.maps) {
      return Promise.resolve();
    }

    // If currently loading, return existing promise
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );
    if (existingScript) {
      if (window.google?.maps) {
        this.isLoaded = true;
        return Promise.resolve();
      }
      // Script exists but not loaded yet, wait for completion
      return new Promise<void>(resolve => {
        const checkLoaded = () => {
          if (window.google?.maps) {
            this.isLoaded = true;
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });
    }

    // Start loading new script
    this.isLoading = true;
    this.loadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');

      // Use provided API key first, otherwise use environment variables
      const apiKey =
        options.apiKey ??
        process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ??
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        reject(new Error('Google Maps API key is required'));
        return;
      }

      const libraries = options.libraries ?? ['places'];
      const librariesParam =
        libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoading = false;
        this.isLoaded = true;

        // Execute all callbacks
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];

        resolve();
      };

      script.onerror = () => {
        this.isLoading = false;
        reject(new Error('Failed to load Google Maps API'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  /**
   * Add callback for when loading is complete
   * @param callback Callback function
   */
  public onLoad(callback: () => void): void {
    if (this.isLoaded && window.google?.maps) {
      callback();
    } else {
      this.callbacks.push(callback);
    }
  }

  /**
   * Check if API is already loaded
   */
  public isAPILoaded(): boolean {
    return this.isLoaded && Boolean(window.google?.maps);
  }
}

export default GoogleMapsLoader.getInstance();
