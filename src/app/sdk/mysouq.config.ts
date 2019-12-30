export class MySouqConfig {
    private static path = 'https://mysouq-server.herokuapp.com';
    // private static path = 'http://localhost:5000';
  
    public static getPath(): string {
      return MySouqConfig.path;
    }
  }