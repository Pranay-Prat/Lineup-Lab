import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const alt = 'Lineup Lab - Create Beautiful Football Lineups';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    // Read the ball loader image and convert to base64 data URL
    const ballImageBuffer = await readFile(join(process.cwd(), 'src', 'assets', 'Ball_Loader.png'));
    const ballImageBase64 = `data:image/png;base64,${ballImageBuffer.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
                }}
            >
                {/* Football field pattern */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.1,
                    }}
                >
                    <div
                        style={{
                            width: '800px',
                            height: '500px',
                            border: '3px solid #10B981',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '150px',
                                height: '150px',
                                border: '3px solid #10B981',
                                borderRadius: '100%',
                            }}
                        />
                    </div>
                </div>

                {/* Main content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                    }}
                >
                    {/* Ball Loader Icon */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '24px',
                        }}
                    >
                        <img
                            src={ballImageBase64}
                            width={100}
                            height={100}
                            alt="Lineup Lab logo"
                            style={{
                                filter: 'invert(1)',
                            }}
                        />
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            marginBottom: '16px',
                            textAlign: 'center',
                            lineHeight: 1.1,
                        }}
                    >
                        Lineup Lab
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontSize: '28px',
                            color: '#9ca3af',
                            textAlign: 'center',
                            maxWidth: '800px',
                            lineHeight: 1.4,
                        }}
                    >
                        Create stunning lineups with drag-and-drop ease
                    </p>

                    {/* Feature badges */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            marginTop: '32px',
                        }}
                    >
                        {['Custom Formations', 'Export Images', 'Share Tactics'].map((feature) => (
                            <div
                                key={feature}
                                style={{
                                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                    border: '1px solid rgba(16, 185, 129, 0.5)',
                                    borderRadius: '9999px',
                                    padding: '12px 24px',
                                    fontSize: '18px',
                                    color: '#10B981',
                                }}
                            >
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient accent */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
