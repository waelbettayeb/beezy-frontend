import React from "react";
import { useStyletron } from "baseui";
import { Card } from "baseui/card";
import { FileUploader, FileUploaderProps } from "baseui/file-uploader";
import { Block } from "baseui/block";
import { Label3 } from "baseui/typography";

interface Props extends FileUploaderProps {
  images: any[];
}

const ImagesUploader = (props: Props) => {
  const [css, theme] = useStyletron();
  return (
    <>
      <FileUploader
        accept={"image/*"}
        multiple
        maxSize={props.maxSize}
        errorMessage={props.errorMessage}
        onRetry={props.onRetry}
        onDrop={props.onDrop}
        progressMessage={props.progressMessage}
        disabled={props.disabled}
        overrides={{
          Root: {
            style: {
              minHeight: theme.sizing.scale3200,
              height: theme.sizing.scale3200,
              display: "flex",
            },
          },
        }}
      />
      <Block
        display="flex"
        overflow={"auto"}
        width={"100%"}
        backgroundColor={theme.colors.mono600}
        height={theme.sizing.scale3200}
      >
        {!props.images.length ? (
          <Block
            width="100%"
            height="100%"
            display={"flex"}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Label3 color={theme.colors.contentInverseSecondary}>
              No images are uploaded
            </Label3>
          </Block>
        ) : (
          <>
            {props.images.map((image) => (
              <Card
                overrides={{
                  Root: {
                    style: {
                      minWidth: theme.sizing.scale3200,
                      width: theme.sizing.scale3200,
                      minHeight: theme.sizing.scale3200,
                      height: theme.sizing.scale3200,
                      display: "flex",
                    },
                  },
                }}
                headerImage={image.url}
              />
            ))}
          </>
        )}
      </Block>
    </>
  );
};

export default ImagesUploader;
