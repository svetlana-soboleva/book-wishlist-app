package com.hobby.bookWishList.book.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoogleBookItem {
    private String id;
    @JsonProperty("volumeInfo")
    private VolumeInfo volumeInfo;

}
