import * as React from 'react';
import { Elixir, ElixirHttpClientModule, elixirConfig, testing } from './http/module/HttpClientModule';
import { localInterceptor, localInterceptor1 } from './localInterceptor';

class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    console.warn(testing);
    new ElixirHttpClientModule().initialize({
      interceptors: [
        localInterceptor,
        localInterceptor1
      ]
    });
    console.log(elixirConfig.interceptors);
    Elixir.get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(r => {
        console.log(r);
      })
    console.warn(testing);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
