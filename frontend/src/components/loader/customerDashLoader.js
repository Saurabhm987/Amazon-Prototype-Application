import React, { Component } from 'react';
import {
    Placeholder,
    Card,
} from 'semantic-ui-react';


class CustomerDashLoader extends Component {
    render() {
        let placeholder = (
            <Card>
                <Placeholder>
                    <Placeholder.Image square style={{ width: '300px', height: '300px' }} />
                </Placeholder>
                <Card.Content>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line length='very short' />
                            <Placeholder.Line length='medium' />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Card.Content>
                <Card.Content extra>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Card.Content>
            </Card>
        )

        return (
            <div>
                <Card.Group itemsPerRow={4} style={{ marginTop: '15px' }}>
                    <Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Image size='small' square />
                            </Placeholder>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Image square size='small' />
                            </Placeholder>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Image square size='small' />
                            </Placeholder>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Image square size='small' />
                            </Placeholder>
                        </Card.Content>
                    </Card>
                </Card.Group>

                <Card.Group doubling itemsPerRow={6} stackable>
                    {placeholder}
                    {placeholder}
                    {placeholder}
                    {placeholder}
                    {placeholder}
                    {placeholder}
                </Card.Group>
            </div>
        );
    }
}

export default CustomerDashLoader;