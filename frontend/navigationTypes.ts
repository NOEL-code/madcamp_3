// navigationTypes.ts
export type RootStackParamList = {
  WebView: undefined;
  Survey: {
    country: string;
    location: {
      label: string;
      name: string;
      lat: number;
      lng: number;
    };
  };
};
