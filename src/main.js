import{
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function () {
    var cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM5MjY0NzIyLCJzdWIiOiJlYzNkMmQ0NS02YTA0LTQ3YzQtOGQ2Ni0wZWQ5Y2I1YmQxNDZ-U1RBR0lOR343MGM2YjhkNy1hNDdhLTQ1MjYtOWIyNy02ZDQ0MTAzY2RlOWQifQ.8khOqHCknMG9HQS8QIBfYOQvxFe5ahbmqnD3QGlKj_M'});

        const session = await cameraKit.createSession();
        document.getElementById('canvas').replaceWith(session.output.live);

        const { lenses } = await cameraKit.lensRepository.loadLensGroups(['96e1322f-2b1c-49bd-b995-932ec7153531']);
         session.applyLens(lenses[0]);

        let mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        });

        const source = createMediaStreamSource(
            mediaStream,{
                cameraType: 'back'
            }
        );

        await session.setSource(source);

        session.source.setRenderSize( window.innerWidth, window.innerHeight);
        session.play();
})();