package com.hobby.bookWishList.book.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VolumeInfo {
    private String title;
    private List<String> authors;

    @JsonProperty("imageLinks")
    private ImageLinks imageLinks;

    private int pageCount;
    private String publishedDate;
    private String description;
    private String language;


    @Getter
    @Setter
    public static class ImageLinks {
        private String smallThumbnail;
        private String large;
    }
}
