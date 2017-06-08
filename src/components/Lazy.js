import React, { Component } from 'react';
import Loading from "./Loading";

export default class Lazy extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            comp: <Loading />
        };
    }

    componentDidMount() {
        setTimeout( () => {
            this.load( this.props );
        }, 2000 );
    }

    load( props ) {
        this.setState( {
            comp: <Loading />
        } );

        import (props.load.toString() + '.js').then( ( comp ) => {
            //console.log('comp: ', comp);
            this.setState( {
                // handle both es imports and cjs
                comp: comp.default ? <comp.default {...this.props} />: <comp {...this.props} />
            });
        } );
    }

    render() {
        return (this.state.comp)
    }
}
