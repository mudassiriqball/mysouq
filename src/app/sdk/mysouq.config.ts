export class MySouqConfig {
    private static path = 'http://localhost:5000';
  
    public static getPath(): string {
      return MySouqConfig.path;
    }
  }